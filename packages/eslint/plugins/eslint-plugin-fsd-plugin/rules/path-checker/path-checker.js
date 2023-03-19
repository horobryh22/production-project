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

    const normalizedPath = path.toNamespacedPath(importTo).split('src')[1];
    const layerTo = normalizedPath.split('\\')[1];
    const sliceTo = normalizedPath.split('\\')[2];

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
            const importFromFile = node.source.value;
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
