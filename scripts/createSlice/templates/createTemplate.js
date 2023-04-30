const fs = require('fs/promises');
const resolveRoot = require('../helpers/resolveRoot');
const changeFirstLetter = require('../helpers/changeFirstLetter');
const createExportFile = require('./createExportFile');

module.exports = async (layer, slice) => {
    try {
        const resolveRootSlicePath = (...segments) => resolveRoot('src', layer, sliceNameUpperCase, ...segments);
        // благодаря функции resolveRoot выходим в корень проекта
        // и указываем где нам нужно создать папку
        const sliceNameUpperCase = changeFirstLetter(slice, 'upper');
        await fs.mkdir(resolveRootSlicePath());
        await fs.writeFile(
            resolveRootSlicePath('index.ts'),
            createExportFile(slice),
        );
    } catch (e) {
        console.error(`Не удалось создать директорию для слайса ${slice}`, e);
    }
};
