"use strict";
/**
 * @module botbuilder-azure
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const documentdb_1 = require("documentdb");
let checkedCollections = {};
function getOrCreateDatabase(client, databaseId) {
    let querySpec = {
        query: 'SELECT * FROM root r WHERE r.id = @id',
        parameters: [{ name: '@id', value: databaseId }]
    };
    return new Promise((resolve, reject) => {
        client.queryDatabases(querySpec).toArray((err, results) => {
            if (err)
                return reject(err);
            if (results.length === 1)
                return resolve(results[0]._self);
            // create db
            client.createDatabase({ id: databaseId }, (err, databaseLink) => {
                if (err)
                    return reject(err);
                resolve(databaseLink._self);
            });
        });
    });
}
function getOrCreateCollection(client, databaseLink, collectionId) {
    let querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{ name: '@id', value: collectionId }]
    };
    return new Promise((resolve, reject) => {
        client.queryCollections(databaseLink, querySpec).toArray((err, results) => {
            if (err)
                return reject(err);
            if (results.length === 1)
                return resolve(results[0]._self);
            client.createCollection(databaseLink, { id: collectionId }, (err, collectionLink) => {
                if (err)
                    return reject(err);
                resolve(collectionLink._self);
            });
        });
    });
}
function sanitizeKey(key) {
    let badChars = ['\\', '?', '/', '#', '\t', '\n', '\r'];
    let sb = '';
    for (let iCh = 0; iCh < key.length; iCh++) {
        let ch = key[iCh];
        let isBad = false;
        for (let iBad in badChars) {
            let badChar = badChars[iBad];
            if (ch === badChar) {
                // We cannot use % because DocumentClient will try to re-encode the % with encodeURI()
                sb += '*' + ch.charCodeAt(0).toString(16);
                isBad = true;
                break;
            }
        }
        if (!isBad)
            sb += ch;
    }
    return sb;
}
class CosmosDbSqlStorage {
    constructor(settings, connectionPolicyConfigurator = null) {
        this.settings = Object.assign({}, settings);
        let policy = new documentdb_1.DocumentBase.ConnectionPolicy();
        if (connectionPolicyConfigurator && typeof connectionPolicyConfigurator === 'function') {
            connectionPolicyConfigurator(policy);
        }
        this.client = new documentdb_1.DocumentClient(settings.serviceEndpoint, { masterKey: settings.authKey }, policy);
    }
    ensureCollectionExists() {
        let key = `${this.settings.databaseId}-${this.settings.collectionId}`;
        if (!checkedCollections[key]) {
            checkedCollections[key] = getOrCreateDatabase(this.client, this.settings.databaseId)
                .then(databaseLink => getOrCreateCollection(this.client, databaseLink, this.settings.collectionId));
        }
        return checkedCollections[key];
    }
    read(keys) {
        return this.ensureCollectionExists().then((collectionLink) => {
            return Promise.all(keys.map(k => {
                return new Promise((resolve, reject) => {
                    let documentLink = documentdb_1.UriFactory.createDocumentUri(this.settings.databaseId, this.settings.collectionId, sanitizeKey(k));
                    this.client.readDocument(documentLink, (err, response) => {
                        if (err) {
                            if (err.code === 404) {
                                return resolve({ id: k, document: null });
                            }
                            else {
                                return reject(err);
                            }
                        }
                        let documentStore = { id: k, document: response.document };
                        documentStore.document.eTag = response._etag;
                        resolve(documentStore);
                    });
                });
            })).then(items => {
                return items.filter(i => !!i.document)
                    .reduce((acc, item) => {
                    acc[item.id] = item.document;
                    return acc;
                }, {});
            });
        }).then((data) => {
            return data;
        });
    }
    write(changes) {
        return this.ensureCollectionExists().then(() => {
            return Promise.all(Object.keys(changes).map(k => {
                let documentChange = {
                    id: sanitizeKey(k),
                    document: changes[k]
                };
                return new Promise((resolve, reject) => {
                    var handleCallback = (err, data) => err ? reject(err) : resolve();
                    let eTag = changes[k].eTag;
                    if (!eTag || eTag === '*') {
                        let uri = documentdb_1.UriFactory.createDocumentCollectionUri(this.settings.databaseId, this.settings.collectionId);
                        this.client.upsertDocument(uri, documentChange, { disableAutomaticIdGeneration: true }, handleCallback);
                    }
                    else if (eTag.length > 0) {
                        // Optimistic Update
                        let uri = documentdb_1.UriFactory.createDocumentUri(this.settings.databaseId, this.settings.collectionId, documentChange.id);
                        let ac = { type: 'IfMatch', condition: eTag };
                        this.client.replaceDocument(uri, documentChange, { accessCondition: ac }, handleCallback);
                    }
                    else {
                        reject(new Error('etag empty'));
                    }
                });
            })).then(() => { }); // void
        });
    }
    delete(keys) {
        return this.ensureCollectionExists().then(() => Promise.all(keys.map(k => new Promise((resolve, reject) => this.client.deleteDocument(documentdb_1.UriFactory.createDocumentUri(this.settings.databaseId, this.settings.collectionId, sanitizeKey(k)), (err, data) => err && err.code !== 404 ? reject(err) : resolve()))))) // handle notfound as Ok
            .then(() => { }); // void
    }
}
exports.CosmosDbSqlStorage = CosmosDbSqlStorage;
//# sourceMappingURL=cosmosDbSqlStorage.js.map