'use strict';
const pathChecker = require('./path-checker');

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "This rule catches errors when importing modules",
        },
        fixable: null,
        // содержимое массива будет находиться в options, здесь мы описываем поля ожидаемого объекта
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string'
                    }
                }
            }
        ],
    },
    create: pathChecker,
}
