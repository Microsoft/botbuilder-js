/**
 * @module botframework-streaming-extensions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { HeaderSerializer } from '../payloads/headerSerializer';
import { SubscribableStream } from '../subscribableStream';
import { PayloadConstants } from '../payloads/payloadConstants';
import { TransportDisconnectedEventArgs } from './transportDisconnectedEventArgs';
import { TransportDisconnectedEventHandler } from './transportDisconnectedEventHandler';
import { ITransportSender } from '../interfaces/iTransportSender';
import { IHeader } from '../interfaces/iHeader';
import { ISendPacket } from '../interfaces/iSendPacket';

export class PayloadSender {
    public disconnected?: TransportDisconnectedEventHandler;
    private sender: ITransportSender;
    private readonly sendHeaderBuffer: Buffer = Buffer.alloc(PayloadConstants.MaxHeaderLength);

    /// <summary>
    /// Returns true if connected to a transport sender.
    /// </summary>
    public get isConnected(): boolean {
        return this.sender !== undefined;
    }

    /// <summary>
    /// Connects to the given transport sender.
    /// </summary>
    /// <param name="sender">The transport sender to connect this payload sender to.</param>
    public connect(sender: ITransportSender): void {
        this.sender = sender;
    }

    /// <summary>
    /// Sends a payload out over the connected transport sender.
    /// </summary>
    /// <param name="header">The header to attach to the outgoing payload.</param>
    /// <param name="payload">The stream of buffered data to send.</param>
    /// <param name="sentCalback">The function to execute when the send has completed.</param>
    public sendPayload(header: IHeader, payload: SubscribableStream, sentCallback: () => Promise<void>): void {
        var packet: ISendPacket = {header: header, payload: payload, sentCallback: sentCallback};
        this.writePacket(packet);
    }

    /// <summary>
    /// Disconnects this payload sender.
    /// </summary>
    /// <param name="e">The disconnected event arguments to include in the disconnected event broadcast.</param>
    public disconnect(e: TransportDisconnectedEventArgs): void {
        if (this.isConnected) {
            this.sender.close();
            this.sender = undefined;

            if (this.disconnected) {
                this.disconnected(this, e || TransportDisconnectedEventArgs.Empty);
            }
        }
    }

    private writePacket(packet: ISendPacket): void {
        try {
            HeaderSerializer.serialize(packet.header, this.sendHeaderBuffer);
            this.sender.send(this.sendHeaderBuffer);

            if (packet.header.payloadLength > 0 && packet.payload) {
                let count = packet.header.payloadLength;
                while (count > 0) {
                    let chunk = packet.payload.read(count);
                    this.sender.send(chunk);
                    count -= chunk.length;
                }

                if (packet.sentCallback) {
                    packet.sentCallback();
                }
            }
        } catch (e) {
            this.disconnect(new TransportDisconnectedEventArgs(e.message));
        }
    }
}
