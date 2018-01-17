/*
 * Code generated by Microsoft (R) AutoRest Code Generator 1.1.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * @class
 * Initializes a new instance of the MediaUrl class.
 * @constructor
 * MediaUrl data
 *
 * @member {string} [url] Url for the media
 *
 * @member {string} [profile] Optional profile hint to the client to
 * differentiate multiple MediaUrl objects from each other
 *
 */
class MediaUrl {
  constructor() {
  }

  /**
   * Defines the metadata of MediaUrl
   *
   * @returns {object} metadata of MediaUrl
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'MediaUrl',
      type: {
        name: 'Composite',
        className: 'MediaUrl',
        modelProperties: {
          url: {
            required: false,
            serializedName: 'url',
            type: {
              name: 'String'
            }
          },
          profile: {
            required: false,
            serializedName: 'profile',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = MediaUrl;
