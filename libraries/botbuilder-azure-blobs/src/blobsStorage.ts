// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import getStream from 'get-stream';
import pmap from 'p-map';
import { ContainerClient, StoragePipelineOptions } from '@azure/storage-blob';
import { Storage, StoreItems } from 'botbuilder-core';
import { assert } from './assert';
import { ignoreError, isStatusCodeError } from './ignoreError';
import { sanitizeBlobKey } from './sanitizeBlobKey';

/**
 * Optional settings for BlobsStorage
 */
export interface BlobsStorageOptions {
    /**
     * [StoragePipelineOptions](xref:@azure/storage-blob.StoragePipelineOptions) to pass to azure blob
     * storage client
     */
    storagePipelineOptions?: StoragePipelineOptions;
}

/**
 * BlobsStorage provides a [Storage](xref:botbuilder-core.Storage) implementation backed by Azure Blob Storage
 */
export class BlobsStorage implements Storage {
    private readonly _containerClient: ContainerClient;
    private readonly _concurrency = Infinity;
    private _initializePromise: Promise<unknown>;

    /**
     * Constructs a BlobsStorage instance.
     *
     * @param connectionString Azure Blob Storage connection string
     * @param containerName Azure Blob Storage container name
     * @param options Other options for BlobsStorage
     */
    constructor(connectionString: string, containerName: string, options?: BlobsStorageOptions) {
        assert(typeof connectionString === 'string', '`connectionString` must be a string');
        assert(connectionString, '`connectionString` must be non-empty', Error);

        assert(typeof containerName === 'string', '`containerName` must be a string');
        assert(containerName, '`containerName` must be non-empty', Error);

        this._containerClient = new ContainerClient(connectionString, containerName, options?.storagePipelineOptions);

        // At most one promise at a time to be friendly to local emulator users
        if (connectionString.trim() === 'UseDevelopmentStorage=true;') {
            this._concurrency = 1;
        }
    }

    /**
     * Returns a promise that resolves when the container is accessible
     * @private
     */
    private _initialize(): Promise<unknown> {
        if (!this._initializePromise) {
            this._initializePromise = this._containerClient.createIfNotExists();
        }
        return this._initializePromise;
    }

    /**
     * Loads store items from storage.
     * @param keys Array of item keys to read
     * @returns The fetched [StoreItems](xref:botbuilder-core.StoreItems)
     */
    async read(keys: string[]): Promise<StoreItems> {
        assert(Array.isArray(keys), '`keys` must be an array');

        await this._initialize();

        return (
            await pmap<string, { key: string; value?: Record<string, unknown> }>(
                keys,
                async (key) => {
                    const blob = await ignoreError(
                        this._containerClient.getBlobClient(sanitizeBlobKey(key)).download(),
                        isStatusCodeError(404)
                    );

                    if (!blob) {
                        return { key, value: null };
                    }

                    const { etag: eTag, readableStreamBody: stream } = blob;

                    const contents = await getStream(stream);
                    const parsed = JSON.parse(contents);

                    return { key, value: { ...parsed, eTag } };
                },
                {
                    concurrency: this._concurrency,
                }
            )
        ).reduce((acc, { key, value }) => (value ? { ...acc, [key]: value } : acc), {});
    }

    /**
     * Saves store items to storage.
     * @param changes Map of [StoreItems](xref:botbuilder-core.StoreItems) to write to storage
     * @returns A promise representing the async operation
     */
    async write(changes: StoreItems): Promise<void> {
        assert(changes, '`changes` must not be null or undefined');
        assert(typeof changes === 'object', '`changes` must be an object');

        await this._initialize();

        await pmap(
            Object.entries(changes),
            ([key, { eTag = '', ...change }]) => {
                const blob = this._containerClient.getBlockBlobClient(sanitizeBlobKey(key));
                const serialized = JSON.stringify(change);

                return blob.upload(serialized, serialized.length, {
                    conditions: typeof eTag === 'string' && eTag !== '*' ? { ifMatch: eTag } : {},
                });
            },
            {
                concurrency: this._concurrency,
            }
        );
    }

    /**
     * Removes store items from storage.
     * @param keys Array of item keys to remove from the store
     * @returns A promise representing the async operation
     */
    async delete(keys: string[]): Promise<void> {
        assert(Array.isArray(keys), '`keys` must be an array');

        await this._initialize();

        await pmap(
            keys,
            (key) => ignoreError(this._containerClient.deleteBlob(sanitizeBlobKey(key)), isStatusCodeError(404)),
            {
                concurrency: this._concurrency,
            }
        );
    }
}
