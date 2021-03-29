/**
 * @module botbuilder-ai
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ComponentDeclarativeTypes } from 'botbuilder-dialogs-declarative';
import { ComponentRegistration } from 'botbuilder-core';
import { LuisBotComponent } from './luisBotComponent';
import { ServiceCollection, noOpConfiguration } from 'botbuilder-runtime-core';

/**
 * Define component assets for Luis.
 */
export class LuisComponentRegistration extends ComponentRegistration {
    private readonly services = new ServiceCollection({
        declarativeTypes: [],
    });

    constructor() {
        super();

        new LuisBotComponent().configureServices(this.services, noOpConfiguration);
    }

    /**
     * Get declarative types for LUIS component registration.
     *
     * @param _resourceExplorer resource explorer
     * @returns component registrations
     */
    public getDeclarativeTypes(_resourceExplorer: unknown): ComponentDeclarativeTypes[] {
        return this.services.mustMakeInstance<ComponentDeclarativeTypes[]>('declarativeTypes');
    }
}
