'use strict';

var ExtendableError = require('./utils/extendable-error');

/**
 * A customized error object.
 * @extends ExtendableError
 */
class ReaderError extends ExtendableError {};

module.exports = ReaderError;
