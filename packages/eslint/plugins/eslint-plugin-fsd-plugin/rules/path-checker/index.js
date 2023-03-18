'use strict';
const pathChecker = require('./path-checker');

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "This rule catches errors when importing modules",
        },
        fixable: "code",
        schema: false,
    },
    create: pathChecker,
}