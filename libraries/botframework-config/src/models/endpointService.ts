/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { decryptString, encryptString } from '../encrypt';
import { IEndpointService, ServiceTypes } from '../schema';
import { ConnectedService } from './connectedService';

export class EndpointService extends ConnectedService implements IEndpointService {
    public appId = '';
    public appPassword = '';
    public endpoint = '';

    constructor(source: IEndpointService) {
        super(source, ServiceTypes.Endpoint);
        const { id, appId = '', appPassword = '', endpoint = '' } = source;
        Object.assign(this, { id, appId, appPassword, endpoint });
    }

    public toJSON(): IEndpointService {
        const { type, appId = '', id = '', appPassword = '', endpoint = '', name = '' } = this;
        return { type, name, id, appId, appPassword, endpoint };
    }

    // encrypt keys in service
    public encrypt(secret: string): void {
        if (this.appPassword && this.appPassword.length > 0)
            this.appPassword = encryptString(this.appPassword, secret);
    }

    // decrypt keys in service
    public decrypt(secret: string): void {
        if (this.appPassword && this.appPassword.length > 0)
            this.appPassword = decryptString(this.appPassword, secret);
    }

}
