export class EndorsementsValidator {
    /**
     * Verify that the set of ChannelIds, which come from the incoming activities,
     * all match the endorsements found on the JWT Token.
     * For example, if an Activity comes from webchat, that channelId says
     * says "webchat" and the jwt token endorsement MUST match that.
     * @param channelId The channel name, typically extracted from the activity.ChannelId field, that to which the Activity is affinitized.
     * @param endorsements Whoever signed the JWT token is permitted to send activities only for
     * some specific channels. That list is the endorsement list, and is validated here against the channelId.
     * @returns {boolean} True is the channelId is found in the Endorsement set. False if the channelId is not found.
     */
    public static validate(channelId: string, endorsements: Array<string>): boolean {
        // If the Activity came in and doesn't have a Channel ID then it's making no
        // assertions as to who endorses it. This means it should pass.
        if (channelId === null || channelId.trim() === '') {
            return true;
        }

        if (endorsements === null) {
            throw new Error('endorsements required');
        }

        // The Call path to get here is:
        // JwtTokenValidation.AuthenticateRequest
        //  ->
        //   JwtTokenValidation.ValidateAuthHeader
        //    ->
        //      ChannelValidation.AuthenticateChannelToken
        //       ->
        //          JWTTokenExtractor

        // Does the set of endorsements match the channelId that was passed in?

        // ToDo: Consider moving this to a HashSet instead of a string
        // array, to make lookups O(1) instead of O(N). To give a sense
        // of scope, tokens from WebChat have about 10 endorsements, and
        // tokens coming from Teams have about 20.

        let endorsementPresent = endorsements.some(value => value === channelId);
        return endorsementPresent;
    }
}
