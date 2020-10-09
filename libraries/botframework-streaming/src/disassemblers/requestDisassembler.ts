/**
 * @module botframework-streaming
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { PayloadTypes } from '../payloads/payloadTypes';
import { PayloadSender } from '../payloadTransport/payloadSender';
import { StreamingRequest } from '../streamingRequest';
import { PayloadDisassembler } from './payloadDisassembler';
import { IStreamWrapper } from '../interfaces/IStreamWrapper';
import { IRequestPayload } from '../interfaces/IRequestPayload';

/**
 * Streaming request disassembler.
 */
export class RequestDisassembler extends PayloadDisassembler {
    public request: StreamingRequest;
    public payloadType: PayloadTypes = PayloadTypes.request;

    public constructor(sender: PayloadSender, id: string, request?: StreamingRequest) {
        super(sender, id);
        this.request = request;
    }

    public async getStream(): Promise<IStreamWrapper> {
        const payload: IRequestPayload = { verb: this.request.verb, path: this.request.path, streams: [] };
        if (this.request.streams) {
            this.request.streams.forEach(function (stream) {
                payload.streams.push(stream.description);
            });
        }
        return PayloadDisassembler.serialize(payload);
    }
}
