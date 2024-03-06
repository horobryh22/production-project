const path = require('path');
const isRelativePath = require('../../helpers/isPathRelative');
const { layers: LAYERS } = require('../../consts');

const getNormalizedPath = (filePath, separator) => {
    return path.normalize(filePath).split(separator)[1] ?? '';
};

const shouldPathBeRelative = (importFrom, importTo) => {
    if (isRelativePath(importFrom)) {
        return false;
    }

    const splitImportFrom = importFrom.split('/');
    const layerFrom = splitImportFrom[0];
    const sliceFrom = splitImportFrom[1];

    if (!layerFrom || !sliceFrom || !LAYERS[layerFrom]) {
        return false;
    }

    // normalize и path.sep чтобы работало в любой системе и Windows и Linux
    const normalizedPath = getNormalizedPath(importTo, 'src');
    const layerTo = normalizedPath.split(path.sep)[1];
    const sliceTo = normalizedPath.split(path.sep)[2];

    return layerFrom === layerTo && sliceFrom === sliceTo && layerFrom !== 'shared';
};

/* правило адаптировано и корректно работает только с использованием алиасов */
/* такие импорты "import { ArticlesList } from '@/entities/Article';" правило проверяет корректно */
/* проверка таких импортов "import { ArticlesList } from 'src/entities/Article';" не предусмотрена */

module.exports = context => {
    // получаем настройки, в данном случае алиас, который прокидывали в тест, или в описании
    // правил в .eslintrc.json
    const { alias = '' } = context.options?.[0] || {};

    return {
        ImportDeclaration: node => {
            const importFromValue = node.source.value;

            // Путь к директории, относительно которой будет проверяться относительный путь
            const importFromFile = alias
                ? importFromValue.replace(`${alias}/`, '')
                : importFromValue;

            // Абсолютный путь к файлу
            const importToFile = context.getFilename();

            if (shouldPathBeRelative(importFromFile, importToFile)) {
                context.report({
                    node,
                    message: 'In this case path should be relative',
                    fix(fixer) {
                        const importFilePath = getNormalizedPath(importToFile, 'src');
                        const importPathWithoutFileName = path.dirname(importFilePath);

                        // Если импорт идет из Public api этого же модуля, то отображаем ошибку, автоматически не фиксим
                        if (importFromFile.split('/').length <= 2) {
                            return;
                        }

                        // Вычисление относительного пути
                        let relativePath = path.relative(
                            importPathWithoutFileName,
                            `/${importFromFile}`,
                        );

                        // Добавление префикса './' к относительному пути так как метод relative сам этого не делает
                        if (!relativePath.startsWith('.')) {
                            relativePath = `./${relativePath}`;
                        }

                        return fixer.replaceText(node.source, `\'${relativePath}\'`);
                    },
                });
            }
        },
    };
};
