/**
 * @module botbuilder
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as jwt from 'jsonwebtoken';
import { Constants } from './constants';
import { ClaimsIdentity, Claim } from './claimsIdentity';
import { OpenIdMetadata } from './openIdMetadata';
import { EndorsementsValidator } from './endorsementsValidator';

export class JwtTokenExtractor {

    // Cache for OpenIdConnect configuration managers (one per metadata URL)
    private static openIdMetadataCache: Map<string, OpenIdMetadata> = new Map<string, OpenIdMetadata>();

    // Token validation parameters for this instance
    readonly tokenValidationParameters: jwt.VerifyOptions;

    // OpenIdMetadata for this instance
    readonly openIdMetadata: OpenIdMetadata;

    constructor(tokenValidationParameters: jwt.VerifyOptions, metadataUrl: string, allowedSigningAlgorithms: string[]) {
        this.tokenValidationParameters = { ...tokenValidationParameters };
        this.tokenValidationParameters.algorithms = allowedSigningAlgorithms;
        this.openIdMetadata = JwtTokenExtractor.getOrAddOpenIdMetadata(metadataUrl);
    }

    public async getIdentityFromAuthHeader(authorizationHeader: string, channelId: string): Promise<ClaimsIdentity | null> {
        if (!authorizationHeader) {
            return null;
        }

        let parts = authorizationHeader.split(' ');
        if (parts.length === 2) {
            return await this.getIdentity(parts[0], parts[1], channelId);
        }

        return null;
    }

    public async getIdentity(scheme: string, parameter: string, channelId: string): Promise<ClaimsIdentity | null> {
        // No header in correct scheme or no token
        if (scheme !== 'Bearer' || !parameter) {
            return null;
        }

        // Issuer isn't allowed? No need to check signature
        if (!this.hasAllowedIssuer(parameter)) {
            return null;
        }

        try {
            return await this.validateToken(parameter, channelId);
        } catch (err) {
            console.log('JwtTokenExtractor.getIdentity:err!', err);
            throw err;
        }
    }

    private hasAllowedIssuer(jwtToken: string): boolean {
        let decoded = <any>jwt.decode(jwtToken, { complete: true });
        let issuer: string = decoded.payload.iss;

        if (Array.isArray(this.tokenValidationParameters.issuer)) {
            return this.tokenValidationParameters.issuer.indexOf(issuer) !== -1;
        }

        if (typeof this.tokenValidationParameters.issuer === 'string') {
            return this.tokenValidationParameters.issuer === issuer;
        }

        return false;
    }

    private async validateToken(jwtToken: string, channelId: string): Promise<ClaimsIdentity> {

        let decodedToken = <any>jwt.decode(jwtToken, { complete: true });

        // Update the signing tokens from the last refresh
        let keyId = decodedToken.header.kid;
        let metadata = await this.openIdMetadata.getKey(keyId);
        if (!metadata) {
            throw new Error('Signing Key could not be retrieved.');
        }

        try {
            let decodedPayload = <any>jwt.verify(jwtToken, metadata.key, this.tokenValidationParameters);

            // enforce endorsements in openIdMetadadata if there is any endorsements associated with the key
            let endorsements = metadata.endorsements;

            if (Array.isArray(endorsements) && endorsements.length !== 0) {
                let isEndorsed = EndorsementsValidator.validate(channelId, endorsements);
                if (!isEndorsed) {
                    throw new Error(`Could not validate endorsement for key: ${keyId} with endorsements: ${endorsements.join(',')}`);
                }
            }

            if (this.tokenValidationParameters.algorithms) {
                if (this.tokenValidationParameters.algorithms.indexOf(decodedToken.header.alg) === -1) {
                    throw new Error(`"Token signing algorithm '${decodedToken.header.alg}' not in allowed list`);
                }
            }

            let claims: Claim[] = Object.keys(decodedPayload).reduce(function (acc, key) {
                acc.push({ type: key, value: decodedPayload[key] });
                return acc;
            }, <Claim[]>[]);

            return new ClaimsIdentity(claims, true);

        } catch (err) {
            console.log('Error finding key for token. Available keys: ' + metadata.key);
            throw err;
        }
    }

    private static getOrAddOpenIdMetadata(metadataUrl: string): OpenIdMetadata {
        let metadata = JwtTokenExtractor.openIdMetadataCache.get(metadataUrl);
        if (!metadata) {
            metadata = new OpenIdMetadata(metadataUrl);
            JwtTokenExtractor.openIdMetadataCache.set(metadataUrl, metadata);
        }

        return metadata;
    }
}
