/**
 * @module botbuilder-dialogs-declarative
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { CustomDeserializer } from './customDeserializer';

export interface DeclarativeType<T = unknown, C = Record<string, unknown>> {
    kind: string;
    type: new (...args: unknown[]) => T;
    loader?: CustomDeserializer<T, C>;
}
