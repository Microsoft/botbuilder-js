/**
 * @module botframework-connector
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Represents a claim.
 */
export interface Claim {
    readonly type: string;
    readonly value: string;
}

/**
 * Represents a claims-based identity.
 */
export class ClaimsIdentity {
    public readonly isAuthenticated: boolean;
    public readonly claims: Claim[];

    /**
     * Initializes a new instance of the [ClaimsIdentity](xref:botframework-connector.ClaimsIdentity) class.
     * @param claims An array of [Claim](xref:botframework-connector.Claim).
     * @param isAuthenticated The value to represent the identity has been authenticated.
     */
    constructor(claims: Claim[], isAuthenticated: boolean) {
        this.claims = claims;
        this.isAuthenticated = isAuthenticated;
    }

    /**
     * Returns a claim value (if its present)
     * @param  {string} claimType The claim type to look for
     * @returns {string|null} The claim value or null if not found
     */
    public getClaimValue(claimType: string): string | null {
        const claim: Claim = this.claims.find((c: Claim) => c.type === claimType);

        return claim ? claim.value : null;
    }
}
