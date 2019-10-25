const assert = require('assert');
const { CosmosDbPartitionedStorage } = require('../lib');
const { StorageBaseTests } = require('../../botbuilder/tests/storageBaseTests');
const { CosmosClient } = require('@azure/cosmos');
const { MockMode, usingNock } = require('./mockHelper');
const nock = require('nock');
const fs = require('fs');

/**
 * @param mode controls the nock mode used for the tests. Available options found in ./mockHelper.js.
 * Setting environment:
 *  PowerShell: $env:MOCK_MODE="<desiredMode>"
 *  Command Prompt: set MOCK_MODE=<desiredMode>
 *  VS Code's launch.json: "env": { "MOCK_MODE": "<desiredMode>" },
 */
const mode = process.env.MOCK_MODE ? process.env.MOCK_MODE : MockMode.lockdown;

const emulatorPath = 'C:/Program Files/Azure Cosmos DB Emulator/CosmosDB.Emulator.exe';

// Endpoint and authKey for the CosmosDB Emulator running locally
const cosmosDbEndpoint = 'https://localhost:8081';
const authKey = 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==';
const databaseId = 'test-db';
const containerId = 'bot-storage';

const checkEmulator = () => {
    if (!fs.existsSync(emulatorPath)) {
        console.warn('This test requires CosmosDB Emulator! go to https://aka.ms/documentdb-emulator-docs to download and install.');
    }
    return true;
};

const getSettings = () => {
    return {
        cosmosDbEndpoint,
        authKey,
        databaseId,
        containerId
    };
};

const storage = new CosmosDbPartitionedStorage(getSettings());

// Disable certificate checking when running tests locally
if (cosmosDbEndpoint.includes('localhost:8081')) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    console.warn('WARNING: Disabling SSL Verification because we detected the emulator was being used');
}

// called before and after each test
const reset = async () => {
    nock.cleanAll();
    nock.enableNetConnect();
    if (mode !== MockMode.lockdown) {
        let settings = getSettings();

        let client = new CosmosClient({ endpoint: settings.cosmosDbEndpoint, key: settings.authKey});
        try {
            await client.database(settings.databaseId).delete();
        } catch (err) { }
        await client.databases.create({ id: databaseId });
    }
};

const options = {
    scope: getSettings().cosmosDbEndpoint
};

describe('CosmosDbPartitionedStorage - Constructor Tests', () => {
    it('throws when provided with null options', () => {
        assert.throws(() => new CosmosDbPartitionedStorage(null), ReferenceError('CosmosDbPartitionedStorageOptions is required.'));
    });

    it('throws when no endpoint provided', () => {
        const noEndpoint = getSettings();
        noEndpoint.cosmosDbEndpoint = null;
        assert.throws(() => new CosmosDbPartitionedStorage(noEndpoint), ReferenceError('cosmosDbEndpoint for CosmosDB is required.'));
    });

    it('throws when no authKey provided', () => {
        const noAuthKey = getSettings();
        noAuthKey.authKey = null;
        assert.throws(() => new CosmosDbPartitionedStorage(noAuthKey), ReferenceError('authKey for CosmosDB is required.'));
    });

    it('throws when no databaseId provided', () => {
        const noDatabaseId = getSettings();
        noDatabaseId.databaseId = null;
        assert.throws(() => new CosmosDbPartitionedStorage(noDatabaseId), ReferenceError('databaseId is for CosmosDB required.'));
    });

    it('throws when no containerId provided', () => {
        const noContainerId = getSettings();
        noContainerId.containerId = null;
        assert.throws(() => new CosmosDbPartitionedStorage(noContainerId), ReferenceError('containerId for CosmosDB is required.'));
    });
});

describe('CosmosDbPartitionedStorage - Base Storage Tests', function() {
    before('cleanup', reset);
    after('cleanup', reset);

    it('return empty object when reading unknown key', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.returnEmptyObjectWhenReadingUnknownKey(storage);
        
        assert.strictEqual(testRan, true);

        return nockDone();
    });

    it('throws when reading null keys', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.throwWhenReadingNullKeys(storage);

        assert.strictEqual(testRan, true);
        return nockDone();
    });

    it('throws when writing null keys', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.throwWhenWritingNullKeys(storage);
        
        assert.strictEqual(testRan, true);
        return nockDone();
    });

    it('does not throw when writing no items', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.doesNotThrowWhenWritingNoItems(storage);
        
        assert.strictEqual(testRan, true);
        return nockDone();
    });

    it('create an object', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.createObject(storage);

        assert.strictEqual(testRan, true);
        return nockDone();
    });

    it('handle crazy keys', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.handleCrazyKeys(storage);

        assert.strictEqual(testRan, true);
        return nockDone();
    });

    it('update an object', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.updateObject(storage);

        assert.strictEqual(testRan, true);
        return nockDone();
    });

    it('delete an object', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.deleteObject(storage);

        assert.strictEqual(testRan, true);
        return nockDone();
    });

    it('does not throw when deleting an unknown object', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.deleteUnknownObject(storage);

        assert.strictEqual(testRan, true);
        return nockDone();
    });

    it('performs batch operations', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.performBatchOperations(storage);

        assert.strictEqual(testRan, true);
        return nockDone();
    });

    it('proceeds through a waterfall dialog', async function() {
        checkEmulator();
        const { nockDone } = await usingNock(this.test, mode, options);

        const testRan = await StorageBaseTests.proceedsThroughWaterfall(storage);

        assert.strictEqual(testRan, true);
        return nockDone();
    });
});