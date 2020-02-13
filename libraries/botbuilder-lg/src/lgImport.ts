/**
 * @module botbuilder-lg
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ImportDefinitionContext } from './generated/LGFileParser';

/**
 * LG Import
 */
export class LGImport {

    public description: string;

    public id: string;

    public source: string;

    public parseTree: ImportDefinitionContext;

    public constructor(parseTree: ImportDefinitionContext, source: string = '') {
        this.parseTree = parseTree;
        this.source = source;
        this.description = this.extractDescription(parseTree);
        this.id = this.extractId(parseTree);
    }

    private readonly extractDescription = (parseTree: ImportDefinitionContext): string => parseTree.text.replace('[', '').replace(']', '');

    private readonly extractId = (parseTree: ImportDefinitionContext): string => parseTree.text.replace('(', '').replace(')', '');
}
