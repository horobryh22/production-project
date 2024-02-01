const path = require('path');

const layer = {
    'shared': 'shared',
    'entities': 'entities',
    'features': 'features',
    'widgets': 'widgets',
    'pages': 'pages'
}

const shouldPathBeRelative = (importFrom, importTo) => {
    if (importFrom.startsWith('./') || importFrom.startsWith('../')) {
        return false;
    }

    const splitImportFrom = importFrom.split('/');
    const layerFrom = splitImportFrom[0];
    const sliceFrom = splitImportFrom[1];

    if (!layerFrom || !sliceFrom || !layer[layerFrom]) {
        return false;
    }

    // normalize и path.sep чтобы работало в любой системе и Windows и Linux
    const normalizedPath = path.normalize(importTo).split('src')[1];
    const layerTo = normalizedPath.split(path.sep)[1];
    const sliceTo = normalizedPath.split(path.sep)[2];

    return layerFrom === layerTo && sliceFrom === sliceTo && layerFrom !== 'shared';
}

const replaceToRelativeImport = (importFrom, importTo) => {
    const separatedImportFrom = importFrom.split('/').filter(Boolean);
    const separatedImportTo = importTo.split('src')[1].split('\\').filter(Boolean);

    const relativeImport = [];

    separatedImportTo.forEach((item, index, arr) => {
        const isItemsEqual = item === separatedImportFrom[index];
        const lastItem = index === arr.length - 1;
        const isArrContainsOnlyDots = relativeImport.every(item => item === '..');

        if (!isItemsEqual) {
            const importFromItem = separatedImportFrom[index];
            relativeImport.push(importFromItem ?? '..');
        }

        if (lastItem && isArrContainsOnlyDots) {
            const importFromLastItem = separatedImportFrom[separatedImportFrom.length - 1];
            relativeImport.push(importFromLastItem);
        }
    })

    console.log({separatedImportTo, separatedImportFrom, relativeImport: relativeImport.join('/')});
}

module.exports = (context) => {
    const { options } = context;
    // const {include = [], exclude = [] } = options[0] || {};

    return {
        ImportDeclaration: (node) => {
            const importFromValue = node.source.value;
            // получаем настройки, в данном случае алиас, который прокидывали в тестх, или в описании
            // правил в .eslintrc.json
            const alias = options?.[0]?.alias ?? '';

            const importFromFile = alias ? importFromValue.replace(`${alias}/`, '') : importFromValue;
            const importToFile = context.getFilename();

            if (shouldPathBeRelative(importFromFile, importToFile)) {
                // replaceToRelativeImport(importFromFile, importToFile);
                context.report({
                    node,
                    message: 'In this case path should be relative'
                    // fix: function(fixer) {
                    //     return fixer.insertTextAfter(node, ";");
                    // }
                })
            }
        },
    };
};
