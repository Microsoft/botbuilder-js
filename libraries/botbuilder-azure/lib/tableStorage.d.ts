/**
 * @module botbuilder-azure
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Storage, StoreItems } from 'botbuilder';
import * as azure from 'azure-storage';
/** Additional settings for configuring an instance of [TableStorage](../classes/botbuilder_azure_v4.tablestorage.html). */
export interface TableStorageSettings {
    /** Name of the table to use for storage. */
    tableName: string;
    /** Storage access key. */
    storageAccessKey?: string;
    /** (Optional) storage account to use or connection string. */
    storageAccountOrConnectionString?: string;
    /** (Optional) azure storage host. */
    host?: azure.StorageHost;
}
/**
 * Middleware that implements an Azure Table based storage provider for a bot.
 *
 * **Usage Example**
 *
 * ```javascript
 * ```
*/
export declare class TableStorage implements Storage {
    private settings;
    private tableService;
    /**
     * Creates a new instance of the storage provider.
     *
     * @param settings (Optional) setting to configure the provider.
     */
    constructor(settings: TableStorageSettings);
    /** Ensure the table is created. */
    private ensureTable();
    /**
     * Loads store items from storage
     *
     * @param keys Array of item keys to read from the store.
     **/
    read(keys: string[]): Promise<StoreItems>;
    /**
     * Saves store items to storage.
     *
     * @param changes Map of items to write to storage.
     **/
    write(changes: StoreItems): Promise<void>;
    /**
     * Removes store items from storage
     *
     * @param keys Array of item keys to remove from the store.
     **/
    delete(keys: string[]): Promise<void>;
    private executeQuery<T>(tableService, tableName, query);
    private deleteInBatch(batch, query);
    private createTableService(storageAccountOrConnectionString, storageAccessKey, host);
    private denodeify<T>(thisArg, fn);
}
export interface TableServiceAsync extends azure.TableService {
    createTableIfNotExistsAsync(table: string): Promise<azure.TableService.TableResult>;
    deleteTableIfExistsAsync(table: string): Promise<boolean>;
    retrieveEntityAsync<T>(table: string, partitionKey: string, rowKey: string): Promise<T>;
    replaceEntityAsync<T>(table: string, entityDescriptor: T): Promise<azure.TableService.EntityMetadata>;
    insertOrReplaceEntityAsync<T>(table: string, entityDescriptor: T): Promise<azure.TableService.EntityMetadata>;
    deleteEntityAsync<T>(table: string, entityDescriptor: T): Promise<void>;
    queryEntitiesAsync<T>(table: string, tableQuery: azure.TableQuery, currentToken: azure.TableService.TableContinuationToken, options: azure.TableService.TableEntityRequestOptions): Promise<azure.TableService.QueryEntitiesResult<T>>;
    executeBatchAsync(table: string, batch: azure.TableBatch): Promise<azure.TableService.BatchResult[]>;
}
export declare class StoreItemContainer {
    readonly key: string;
    readonly obj: any;
    readonly eTag: string;
    constructor(key: string, obj: any);
    split(): StoreItemEntity[];
    static join(chunks: StoreItemEntity[]): StoreItemContainer;
}
export interface StoreItemEntity {
    PartitionKey: azure.TableUtilities.entityGenerator.EntityProperty<string>;
    RowKey: azure.TableUtilities.entityGenerator.EntityProperty<string>;
    RealKey: azure.TableUtilities.entityGenerator.EntityProperty<string>;
    Json: azure.TableUtilities.entityGenerator.EntityProperty<string>;
}
