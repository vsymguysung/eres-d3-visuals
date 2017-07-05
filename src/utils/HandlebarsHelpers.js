/**
 * @module HandlebarsHelpers
 *
 *
 * File: HandlebarsHelpers.js
 *
 *
 * Author: Guy-Sung Kim.
 *
 * Copyright (c) 2017 eResources
 *
 * Revision History
 *    - v0.1.0 2017.JUL by Guy-Sung Kim, Initial creation.
 */

export default function(Handlebars) {
  Handlebars.registerHelper('encodeURIComponent', function(text) {
    return new Handlebars.SafeString(text);
  });
}

