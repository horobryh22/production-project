const createTemplate = require('./templates/createTemplate');
const createModel = require('./templates/createModel');
const createUI = require('./templates/createUI');

// вытасикваем из команды запуска скрипта второй и третий аргументы,
// это будут названия слоя и слайса
const layer = process.argv[2];
const slice = process.argv[3];

const allowedLayers = ['features', 'entities', 'pages'];

if (!layer || !allowedLayers.includes(layer)) {
    throw new Error(`Не корректное название слоя. Укажите слой ${allowedLayers.join(' или ')}`);
}

if (!slice) {
    throw new Error('Введите название слайса');
}

(async() => {
    await createTemplate(layer, slice);
    await createModel(layer, slice);
    await createUI(layer, slice);
})();
