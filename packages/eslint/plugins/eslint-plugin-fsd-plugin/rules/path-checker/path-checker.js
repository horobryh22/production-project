const path = require('path');
const isRelativePath = require('../../helpers/isPathRelative');
const {layers: LAYERS} = require('../../consts');

// TODO сделать автофикс для этого правила!

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
    const normalizedPath = path.normalize(importTo).split('src')[1];
    const layerTo = normalizedPath.split(path.sep)[1];
    const sliceTo = normalizedPath.split(path.sep)[2];

    return layerFrom === layerTo && sliceFrom === sliceTo && layerFrom !== 'shared';
};

module.exports = (context) => {
    // получаем настройки, в данном случае алиас, который прокидывали в тест, или в описании
    // правил в .eslintrc.json
    const { alias = '' } = context.options?.[0] || {};

    return {
        ImportDeclaration: (node) => {
            const importFromValue = node.source.value;

            const importFromFile = alias ? importFromValue.replace(`${alias}/`, '') : importFromValue;
            const importToFile = context.getFilename();

            if (shouldPathBeRelative(importFromFile, importToFile)) {
                context.report({
                    node,
                    message: 'In this case path should be relative',
                });
            }
        },
    };
};
