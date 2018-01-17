/*
 * Code generated by Microsoft (R) AutoRest Code Generator 1.1.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

const models = require('./index');

/**
 * @class
 * Initializes a new instance of the ErrorResponse class.
 * @constructor
 * An HTTP API response
 *
 * @member {object} [error] Error message
 *
 * @member {string} [error.code] Error code
 *
 * @member {string} [error.message] Error message
 *
 */
class ErrorResponse {
  constructor() {
  }

  /**
   * Defines the metadata of ErrorResponse
   *
   * @returns {object} metadata of ErrorResponse
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ErrorResponse',
      type: {
        name: 'Composite',
        className: 'ErrorResponse',
        modelProperties: {
          error: {
            required: false,
            serializedName: 'error',
            type: {
              name: 'Composite',
              className: 'ErrorModel'
            }
          }
        }
      }
    };
  }
}

module.exports = ErrorResponse;
