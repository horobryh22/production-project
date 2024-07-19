import { Project } from 'ts-morph';
import { toggleFunc } from './toggleFunc';
import { toggleComponent } from './toggleComponent';

const featureName = process.argv[2];
const flag = process.argv[3];

if (!featureName) {
    throw Error('Не передано название фичи!');
}

if (!flag) {
    throw Error('Не передан флаг!');
}

if (!['on', 'off'].includes(flag)) {
    throw Error('Укажите корректное значсение для флага (on/off)!');
}

const project = new Project();

// сначала добавляем все файлы
project.addSourceFilesAtPaths(['src/**/*.ts', 'src/**/*.tsx']);

// затем получаем эти файлы
const files = project.getSourceFiles();

files.forEach(sourceFile => {
    sourceFile.forEachDescendant(node => {
        // для функций, констант и прочего, что нужно для конкретных фичей
        toggleFunc(node, flag, featureName);

        // для компонент
        toggleComponent(node, flag, featureName);
    });
});

project.save();
