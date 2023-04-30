const fs = require('fs/promises');
const resolveRoot = require('../helpers/resolveRoot');
const createReduxSliceTemplate = require('./createReduxSliceTemplate');
const createSelectorsTemplate = require('./createSelectorsTemplate');
const createTypesTemplate = require('./createTypesTemplate');
const changeFirstLetter = require('../helpers/changeFirstLetter');

module.exports = async (layer, slice) => {
    const sliceNameUpperCase = changeFirstLetter(slice, 'upper');
    const resolveModelPath = (...segments) => resolveRoot('src', layer, sliceNameUpperCase, 'model', ...segments);

    // создаем папку model в директории с нашим slice
    // и затем формируем всю структуру папок внутри нее
    const createModelFolder = async () => {
        try {
            await fs.mkdir(resolveModelPath(''));
            await fs.mkdir(resolveModelPath('types'));
            await fs.mkdir(resolveModelPath('slices'));
            await fs.mkdir(resolveModelPath('selectors'));
            await fs.mkdir(resolveModelPath('services'));
        } catch (e) {
            console.error(`Не удалось создать папку model или структуру внутри нее для слайса ${slice}`, e);
        }
    };

    // внутри папки slices создаем файл sliceSlice.ts
    // и записываем в него наш шаблон
    const createReduxSlice = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('slices', `${slice}Slice.ts`),
                createReduxSliceTemplate(slice),
            );
        } catch (e) {
            console.error(`Не удалось создать redux slice для ${slice}`, e);
        }
    };

    // внутри папки selectors создаем файл slice.ts
    // и записываем в него наш шаблон
    const createSliceSelectors = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('selectors', `${slice}.ts`),
                createSelectorsTemplate(slice),
            );
        } catch (e) {
            console.error(`Не удалось создать selectors для ${slice}`, e);
        }
    };

    // внутри папки type создаем файл index.ts
    // и записываем в него наш шаблон
    const createSliceTypes = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('types', 'index.ts'),
                createTypesTemplate(slice),
            );
        } catch (e) {
            console.error(`Не удалось создать types для ${slice}`, e);
        }
    };

    await createModelFolder();
    await createReduxSlice();
    await createSliceSelectors();
    await createSliceTypes();
};