/**
 * @module botbuilder-dialogs-declarative
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Configurable } from 'botbuilder-dialogs';
import { Newable } from 'botbuilder-stdlib';
import { CustomDeserializer } from './customDeserializer';
import { ResourceExplorer } from './resources';

/**
 * A default loader for deserializing configuration objects.
 */
export class DefaultLoader implements CustomDeserializer<Configurable, Record<string, unknown>> {
    /**
     * Intializes an instance of `DefaultLoader`.
     *
     * @param {ResourceExplorer} _resourceExplorer The `ResourceExplorer` used by the loader.
     */
    public constructor(private readonly _resourceExplorer: ResourceExplorer) {}

    /**
     * The method that loads the configuration object to a requested type.
     *
     * @param {Record<string, string>} config The configuration object to deserialize.
     * @param {Newable<Configurable>} type The object type that the configuration will be deserialized to.
     * @returns {Configurable} A `Configurable` object created from the configuration.
     */
    public load(config: Record<string, unknown>, type: Newable<Configurable>): Configurable {
        return Object.entries(config).reduce((instance, [key, value]) => {
            let converter = instance.getConverter(key);
            if (converter) {
                if (typeof converter === 'function') {
                    converter = new converter(this._resourceExplorer);
                }
                instance[`${key}`] = converter.convert(value);
            } else {
                instance[`${key}`] = value;
            }
            return instance;
        }, new type());
    }
}
