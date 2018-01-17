/*
 * Code generated by Microsoft (R) AutoRest Code Generator 1.1.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

const models = require('./index');

/**
 * @class
 * Initializes a new instance of the HeroCard class.
 * @constructor
 * A Hero card (card with a single, large image)
 *
 * @member {string} [title] Title of the card
 *
 * @member {string} [subtitle] Subtitle of the card
 *
 * @member {string} [text] Text for the card
 *
 * @member {array} [images] Array of images for the card
 *
 * @member {array} [buttons] Set of actions applicable to the current card
 *
 * @member {object} [tap] This action will be activated when user taps on the
 * card itself
 *
 * @member {string} [tap.type] Defines the type of action implemented by this
 * button.
 *
 * @member {string} [tap.title] Text description which appear on the button.
 *
 * @member {string} [tap.image] URL Picture which will appear on the button,
 * next to text label.
 *
 * @member {object} [tap.value] Supplementary parameter for action. Content of
 * this property depends on the ActionType
 *
 */
class HeroCard {
  constructor() {
  }

  /**
   * Defines the metadata of HeroCard
   *
   * @returns {object} metadata of HeroCard
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'HeroCard',
      type: {
        name: 'Composite',
        className: 'HeroCard',
        modelProperties: {
          title: {
            required: false,
            serializedName: 'title',
            type: {
              name: 'String'
            }
          },
          subtitle: {
            required: false,
            serializedName: 'subtitle',
            type: {
              name: 'String'
            }
          },
          text: {
            required: false,
            serializedName: 'text',
            type: {
              name: 'String'
            }
          },
          images: {
            required: false,
            serializedName: 'images',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'CardImageElementType',
                  type: {
                    name: 'Composite',
                    className: 'CardImage'
                  }
              }
            }
          },
          buttons: {
            required: false,
            serializedName: 'buttons',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'CardActionElementType',
                  type: {
                    name: 'Composite',
                    className: 'CardAction'
                  }
              }
            }
          },
          tap: {
            required: false,
            serializedName: 'tap',
            type: {
              name: 'Composite',
              className: 'CardAction'
            }
          }
        }
      }
    };
  }
}

module.exports = HeroCard;
