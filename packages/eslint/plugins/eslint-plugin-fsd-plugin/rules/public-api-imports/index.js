'use strict';
const publicApiImports = require('./public-api-imports');
const {testingReport, publicApiReport} = require('../../consts');

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Правило отслеживает, чтобы в слоях был импорт только из Public API",
        },
        messages: {
            [publicApiReport]: 'Импорт должен происходить только из Public API (index.ts)',
            [testingReport]: 'Тестовые данные можно импортировать только из testing.tsx (testing public API)',
        },
        fixable: 'code', // означает, что можно пофиксить автоматически
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string'
                    },
                    testFilesPatterns: {
                        type: 'array'
                    }
                }
            },
        ],
    },
    create: publicApiImports,
}
