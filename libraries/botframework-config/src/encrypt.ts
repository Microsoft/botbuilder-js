/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */

import * as crypto from 'crypto';

export function generateKey(): string {
    // Generates 32 byte cryptographically strong pseudo-random data as a base64 encoded string 
    // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    return crypto.randomBytes(32).toString('base64');
}

/**
 * Encrypt a string using standardized encyryption of AES256 
 * @param plainText value to encrypt
 * @param secret secret to use
 */
export function encryptString(plainText: string, secret: string): string {
    if (!plainText || plainText.length == 0)
        throw new Error('you must pass a value');

    if (!secret || plainText.length == 0)
        throw new Error('you must pass a secret');

    let keyBytes = new Buffer(secret, 'base64');

    // Generates 16 byte cryptographically strong pseudo-random data as IV
    // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    let ivBytes = crypto.randomBytes(16);
    let ivText = ivBytes.toString('base64');

    // encrypt using aes256 iv + key + plainText = encryptedText
    let cipher = crypto.createCipheriv('aes256', keyBytes, ivBytes);
    let encryptedValue = cipher.update(plainText, 'utf8', 'base64');
    encryptedValue += cipher.final('base64');

    // store base64(ivBytes)!base64(encryptedValue)
    return `${ivText}!${encryptedValue}`;
}

/**
 *  Decrypt a string using standardized encyryption of AES256 
 * @param enryptedValue value to decrypt
 * @param secret secret to use
 */
export function decryptString(encryptedValue: string, secret: string): string {
    if (!encryptedValue || encryptedValue.length == 0)
        throw new Error('you must pass a encryptedValue');

    if (!secret || secret.length == 0)
        throw new Error('you must pass a secret');

    // enrypted value = base64(ivBytes)!base64(encryptedValue)
    let parts = encryptedValue.split('!');
    if (parts.length != 2)
        throw new Error("The encrypted value is not a valid format");

    let ivText = parts[0];
    let encryptedText = parts[1];

    let ivBytes = new Buffer(ivText, 'base64');
    let keyBytes = new Buffer(secret, 'base64');

    if (ivBytes.length != 16)
        throw new Error("The encrypted value is not a valid format");

    if (keyBytes.length != 32)
        throw new Error("The secret is not valid format");

    // decrypt using aes256 iv + key + encryptedText = decryptedText
    let decipher = crypto.createDecipheriv('aes256', keyBytes, ivBytes);
    let value = decipher.update(encryptedText, 'base64', 'utf8');
    value += decipher.final('utf8');
    return value;
}
