'use strict';
const publicApiImports = require('./public-api-imports');

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Правило отслеживает, чтобы в слоях был импорт только из Public API",
        },
        fixable: null,
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
    create: publicApiImports,
}
