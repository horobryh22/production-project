const path = require('path');
const micromatch = require('micromatch');
const isRelativePath = require('../../helpers/isPathRelative');
const {testingReport, publicApiReport} = require('../../consts');

// слои, в которых запрещен импорт не из Public API
const FORBIDDEN_LAYERS = ['entities', 'features', 'widgets', 'pages'];

module.exports = (context) => {
    const { alias = '', testFilesPatterns = [] } = context.options?.[0] || {};

    return {
        ImportDeclaration: (node) => {
            const importFromValue = node.source.value;

            const importFromFile = path.normalize(alias ? importFromValue.replace(`${alias}/`, '') : importFromValue);

            // проверяем, является ли путь относительным
            if (isRelativePath(importFromFile)) {
                return;
            }

            const importSegments = importFromFile.split(path.sep);

            const layer = importSegments[0];
            const slice = importSegments[1];

            const isForbiddenImport = importSegments.length > 2 && FORBIDDEN_LAYERS.includes(layer);
            const isImportFormTestingPublicAPI = importSegments[2] === 'testing' && importSegments.length < 4;

            // если больше 2-х сегментов, и импорт происходит из одного из наших слоев, а не из других библиотек,
            // тогда бросаем ошибку, слоя shared это правило пока не касается
            if (isForbiddenImport && !isImportFormTestingPublicAPI) {
                context.report({
                    node,
                    messageId: publicApiReport,
                    // фиксим автоматически
                    fix(fixer) {
                        return fixer.replaceText(node.source, `\'${alias}/${layer}/${slice}\'`);
                    }
                });
            }

            // если пытаемся импортировать файл из features/Article/testing,
            // то проверяем в какой конкретно файл пытаемся импортировать из testing Public API
            if (isImportFormTestingPublicAPI && testFilesPatterns.length) {
                // получаем файл, в который импортируем
                const importToFile = path.normalize(context.getFilename());

                // проверяем, соответствует ли этот файл тем паттернам, которое есть в массиве testFilesPatterns
                const isCorrectImport = testFilesPatterns.some(
                    pattern => micromatch.isMatch(importToFile, pattern),
                );

                if (!isCorrectImport) {
                    context.report({
                        node,
                        messageId: testingReport ,
                    });
                }
            }
        },
    };
};
