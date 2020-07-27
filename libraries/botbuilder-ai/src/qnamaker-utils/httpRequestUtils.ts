/**
 * @module botbuilder-ai
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as os from 'os';
const pjson: any = require('../../package.json');

import { QnAMakerEndpoint } from '../qnamaker-interfaces/qnamakerEndpoint';
import { QnAMakerResult } from '../qnamaker-interfaces/qnamakerResult';

import { getFetch } from '../globals';
const fetch = getFetch();

/**
 * Http request utils class.
 *
 * @remarks
 * This class is helper class for all the http request operations.
 */
export class HttpRequestUtils {
    /**
     * Execute Http request.
     * 
     * @param requestUrl Http request url.
     * @param payloadBody Http request body.
     * @param endpoint QnA Maker endpoint details.
     * @param timeout (Optional)Timeout for http call 
     */
    public async executeHttpRequest(requestUrl: string, payloadBody: string, endpoint: QnAMakerEndpoint, timeout?: number) {
        if (!requestUrl) {
            throw new TypeError('Request url cannot be null.');
        }

        if (!payloadBody) {
            throw new TypeError('Payload body cannot be null.');
        }

        if (!endpoint) {
            throw new TypeError('Payload body cannot be null.');
        }

        const headers: any = this.getHeaders(endpoint);

        try {
            const qnaResult = await fetch(requestUrl, {
                method: 'POST',
                headers: headers,
                timeout: timeout,
                body: payloadBody
            });
            const jsonResult = qnaResult.status == 204 ? this.getSuccessfulTrainApiResult() : await qnaResult.json();

            return jsonResult;

        } catch (error) {
            throw error;
        }
    }

    /**
     * Sets headers for request to QnAMaker service.
     *
     * The [QnAMakerEndpointKey](#QnAMakerEndpoint.QnAMakerEndpointKey) is set as the value of
     * `Authorization` header for v4.0 and later of QnAMaker service.
     *
     * Legacy QnAMaker services use the `Ocp-Apim-Subscription-Key` header for the QnAMakerEndpoint value instead.
     *
     * [QnAMaker.getHeaders()](#QnAMaker.getHeaders) also gets the User-Agent header value.
     */
    private getHeaders(endpoint: QnAMakerEndpoint): any {
        const headers: any = {};

        headers['Ocp-Apim-Subscription-Key'] = endpoint.endpointKey;
        headers.Authorization = `EndpointKey ${ endpoint.endpointKey }`;
        headers['User-Agent'] = this.getUserAgent();
        headers['Content-Type'] = 'application/json';

        return headers;
    }

    private getUserAgent(): string {
        const packageUserAgent: string = `${ pjson.name }/${ pjson.version }`;
        const platformUserAgent: string = `(${ os.arch() }-${ os.type() }-${ os.release() }; Node.js,Version=${ process.version })`;

        return `${ packageUserAgent } ${ platformUserAgent }`;
    }

    private getSuccessfulTrainApiResult(): QnAMakerResult {
        return {
            questions: [],
            answer: "Successfully trained.",
            score: 100,
            id: -1,
            source: null,
            metadata: []
        };
    }
}
