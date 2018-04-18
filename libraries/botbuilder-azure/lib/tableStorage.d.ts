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
    /**
     * Name of the table to use for storage.
     * Check table name rules: https://docs.microsoft.com/en-us/rest/api/storageservices/Understanding-the-Table-Service-Data-Model?redirectedfrom=MSDN#table-names
    */
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
 * const BotBuilderAzure = require('botbuilder-azure');
 * const storage = new BotBuilderAzure.TableStorage({
 *     storageAccountOrConnectionString: 'UseDevelopmentStorage=true',
 *     tableName: 'mybotstate'
 *   });
 *
 * // Add state middleware
 * const state = new BotStateManager(storage);
 * adapter.use(state);
 * ```
*/
export declare class TableStorage implements Storage {
    private settings;
    private tableService;
    /**
     * Creates a new instance of the storage provider.
     *
     * @param settings (Optional) Setting to configure the provider.
     */
    constructor(settings: TableStorageSettings);
    /** Ensure the table is created. */
    ensureTable(): Promise<azure.TableService.TableResult>;
    /** Delete backing table (mostly used for unit testing.) */
    deleteTable(): Promise<boolean>;
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
    private sanitizeKey(key);
    private createTableService(storageAccountOrConnectionString, storageAccessKey, host);
    private denodeify<T>(thisArg, fn);
}
