/**
 * @module botframework-streaming-extensions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { PayloadTypes } from '../payloads/payloadTypes';
import { PayloadSender } from '../payloadtransport/payloadSender';
import { StreamingResponse } from '../streamingResponse';
import { PayloadDisassembler } from './payloadDisassembler';
import { IStreamWrapper } from '../interfaces/iStreamWrapper';
import { IResponsePayload } from '../interfaces/iResponsePayload';

export class ResponseDisassembler extends PayloadDisassembler {
    public readonly response: StreamingResponse;
    public readonly payloadType: PayloadTypes = PayloadTypes.response;

    public constructor(sender: PayloadSender, id: string, response: StreamingResponse) {
        super(sender, id);
        this.response = response;
    }

    public async getStream(): Promise<IStreamWrapper> {
        let payload: IResponsePayload = {statusCode: this.response.statusCode, streams: []};
        if (this.response.streams) {
            this.response.streams.forEach(function(stream){
                payload.streams.push(stream.description);
            })
        }
        return PayloadDisassembler.serialize(payload);
    }
}
