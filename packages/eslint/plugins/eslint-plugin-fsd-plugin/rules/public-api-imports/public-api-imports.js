const path = require('path');

// слои, в которых запрещен импорт не из Public API
const FORBIDDEN_LAYERS = ['entities', 'features',  'widgets', 'pages'];

module.exports = (context) => {
    const { options } = context;

    return {
        ImportDeclaration: (node) => {
            const importFromValue = node.source.value;
            const alias = options?.[0]?.alias ?? '';

            const importFromFile = path.normalize(alias ? importFromValue.replace(`${alias}/`, '') : importFromValue);

            // проверяем, является ли путь относительным
            if (importFromFile.startsWith('.')) {
                return;
            }

            const importSegments = importFromFile.split(path.sep);

            // если больше 2-х сегментов, и импорт происходит из одного из наших слоев, а не из других библиотек,
            // тогда бросаем ошибку, слоя shared это правило пока не касается
            if (importSegments.length > 2 && FORBIDDEN_LAYERS.includes(importSegments[0])) {
                context.report({
                    node,
                    message: 'Импорт должен происходить только из Public API (index.ts)'
                })
            }
        },
    };
};
