const fs = require('fs/promises');
const resolveRoot = require('../helpers/resolveRoot');
const createComponentTemplate = require('./createComponentTemplate');
const createStoryTemplate = require('./createStoryTemplate');
const createStyleTemplate = require('./createStyleTemplate');
const changeFirstLetter = require('../helpers/changeFirstLetter');

module.exports = async (layer, slice) => {
    const sliceNameUpperCase = changeFirstLetter(slice, 'upper');
    const resolveUIPath = (...segments) => resolveRoot(
        'src',
        layer,
        sliceNameUpperCase,
        'ui',
        ...segments
    );

    const createUIFolder = async () => {
        try {
            await fs.mkdir(resolveUIPath(''));
            await fs.mkdir(resolveUIPath(sliceNameUpperCase));
        } catch (e) {
            console.error(`Не удалось создать папку ui для слайса ${slice}`, e);
        }
    };

    const createComponentFile = async () => {
        try {
            await fs.writeFile(
                resolveUIPath(sliceNameUpperCase, `${sliceNameUpperCase}.tsx`),
                createComponentTemplate(slice),
            );
        } catch (e) {
            console.error(`Не удалось создать файл для компоненты ${sliceNameUpperCase}.tsx`, e);
        }
    };

    const createStoryFile = async () => {
        try {
            await fs.writeFile(
                resolveUIPath(sliceNameUpperCase, `${sliceNameUpperCase}.stories.tsx`),
                createStoryTemplate(layer, slice),
            );
        } catch (e) {
            console.error(`Не удалось создать story для ${slice}`, e);
        }
    };

    const createStyleFile = async () => {
        try {
            await fs.writeFile(
                resolveUIPath(sliceNameUpperCase, `${sliceNameUpperCase}.module.scss`),
                createStyleTemplate(slice),
            );
        } catch (e) {
            console.error(`Не удалось создать scss файл для ${slice}`, e);
        }
    };

    await createUIFolder();
    await createComponentFile();
    await createStoryFile();
    await createStyleFile();
};