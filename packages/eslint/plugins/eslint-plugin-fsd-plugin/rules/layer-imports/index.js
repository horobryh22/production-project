'use strict';
const layerImports = require('./layer-imports');

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Правило запрещает импорт из верхних слоев в нижние",
        },
        fixable: null,
        // содержимое массива будет находиться в options, здесь мы описываем поля ожидаемого объекта
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string'
                    },
                    ignoredImportPatterns: {
                        type: 'array'
                    },
                    testFilesPatterns: {
                        type: 'array'
                    }
                }
            }
        ],
    },
    create: layerImports,
}
