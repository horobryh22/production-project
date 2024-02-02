const path = require('path');
const micromatch = require('micromatch');

// слои, в которых запрещен импорт не из Public API
const FORBIDDEN_LAYERS = ['entities', 'features', 'widgets', 'pages'];

module.exports = (context) => {
    const { alias = '', testFilesPatterns = [] } = context.options?.[0] || {};

    return {
        ImportDeclaration: (node) => {
            const importFromValue = node.source.value;

            const importFromFile = path.normalize(alias ? importFromValue.replace(`${alias}/`, '') : importFromValue);

            // проверяем, является ли путь относительным
            if (importFromFile.startsWith('.')) {
                return;
            }

            const importSegments = importFromFile.split(path.sep);
            const isForbiddenImport = importSegments.length > 2 && FORBIDDEN_LAYERS.includes(importSegments[0]);
            const isImportFormTestingPublicAPI = importSegments[2] === 'testing' && importSegments.length < 4;

            // если больше 2-х сегментов, и импорт происходит из одного из наших слоев, а не из других библиотек,
            // тогда бросаем ошибку, слоя shared это правило пока не касается
            if (isForbiddenImport && !isImportFormTestingPublicAPI) {
                context.report({
                    node,
                    message: 'Импорт должен происходить только из Public API (index.ts)',
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
                        message: `Тестовые данные из testing.tsx (public API), можно импортировать только в файлы, соответствующие паттернам:${testFilesPatterns.join(', ')}`,
                    });
                }
            }
        },
    };
};
