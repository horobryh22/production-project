const path = require('path');
const isRelativePath = require('../../helpers/isPathRelative');
const { layers: LAYERS } = require('../../consts');
const micromatch = require('micromatch');

const ALLOWED_LAYERS_IMPORTS = {
    app: ['pages', 'widgets', 'features', 'shared', 'entities'],
    pages: ['widgets', 'features', 'shared', 'entities'],
    widgets: ['features', 'shared', 'entities'],
    features: ['shared', 'entities'],
    entities: ['shared', 'entities'],
    shared: ['shared'],
};

module.exports = (context) => {
    const {
        alias = '',
        ignoredImportPatterns = [],
        testFilesPatterns= []
    } = context.options?.[0] || {};

    return {
        ImportDeclaration: (node) => {
            const importFromValue = node.source.value;

            const importFromFile = path.normalize(alias ? importFromValue.replace(`${alias}/`, '') : importFromValue);
            const importToFile = path.normalize(context.getFilename());

            // если путь импорта относительный, ничего не делаем
            if (isRelativePath(importFromFile)) {
                return;
            }

            const importFromSegments = importFromFile.split('/') ?? [];
            const importToSegments = importToFile.split('src')?.[1]?.split(path.sep) ?? [];

            const importFromLayer = importFromSegments[0] === 'src' ? importFromSegments[1] : importFromSegments[0];
            const importToLayer = importToSegments[1];

            // если импорт идет не из наших слоев, а из каких-то библиотек
            // импорт идет в файл не из нашей структуры слоев
            if (!LAYERS[importFromLayer] || !LAYERS[importToLayer]) {
                return;
            }

            // если был передан массив с паттернами, которые исключает работу правила для определенных импортов
            if (ignoredImportPatterns.length) {
                const isRuleIgnored = ignoredImportPatterns.some(
                    pattern => micromatch.isMatch(importFromFile, pattern),
                );

                if (isRuleIgnored) {
                    return;
                }
            }

            // если был передан массив с паттернами, которые исключают работу правила для определенных файлов,
            // в которые импорт происходит (тестовые данные, сторис)
            if (testFilesPatterns.length) {
                const isCorrectImport = testFilesPatterns.some(
                    pattern => micromatch.isMatch(importToFile, pattern),
                );

                if (isCorrectImport) {
                    return;
                }
            }

            // если я импортирую из вышележащего слоя в нижележащий
            if (!ALLOWED_LAYERS_IMPORTS[importToLayer].includes(importFromLayer)) {
                context.report({
                    node,
                    message: `Слой может импортировать в себя только разрешенные ниже лежащие слои: ${ALLOWED_LAYERS_IMPORTS[importToLayer].join(', ')}`,
                });
            }
        },
    };
};
