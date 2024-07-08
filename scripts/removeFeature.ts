import { Project, SyntaxKind, Node } from 'ts-morph';

const featureName = process.argv[2];
const flag = process.argv[3];

console.log({ featureName, flag });

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

const isToggleFunc = (node: Node) => {
    let isToggledFeature = false;

    node.forEachChild(child => {
        if (
            child.isKind(SyntaxKind.PropertyAccessExpression) &&
            child.getName() === 'toggleFeature'
        ) {
            isToggledFeature = true;
        }
    });

    return isToggledFeature;
};

files.forEach(sourceFile => {
    sourceFile.forEachDescendant(node => {
        // в файле ищем все ноды которые являются вызовом функции и среди них ищем нужную нам
        if (node.isKind(SyntaxKind.JsxExpression)) {
            node.forEachDescendant(jsxNode => {
                if (jsxNode.isKind(SyntaxKind.CallExpression) && isToggleFunc(jsxNode)) {
                    // в нужной ноде получаем объект (аргумент), который передаем при вызове функции toggleFeature
                    const objectOptions = jsxNode.getFirstDescendantByKind(
                        SyntaxKind.ObjectLiteralExpression,
                    );

                    if (!objectOptions) {
                        return;
                    }

                    const nameProperty = objectOptions?.getProperty('name');
                    const onProperty = objectOptions?.getProperty('on');
                    const offProperty = objectOptions?.getProperty('off');

                    // из полученных объектов свойств вытаскиваем необходимые нам данные
                    const name = nameProperty
                        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral) // знаем что тут строка
                        ?.getText()
                        ?.slice(1, -1);

                    const onResult = onProperty
                        ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction) // знаем что тут стрелочная ф-ия
                        ?.getBody()
                        ?.getText();

                    const offResult = offProperty
                        ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction) // знаем что тут стрелочная ф-ия
                        ?.getBody()
                        ?.getText();

                    // проверяем что название фичи из скрипта и название фичи в файле совпадают
                    if (name !== featureName) {
                        return;
                    }

                    // изменяем значение JSX ноды в зависимости от флага
                    if (flag === 'on') {
                        node.replaceWithText(onResult ?? '');
                    }

                    if (flag === 'off') {
                        node.replaceWithText(offResult ?? '');
                    }
                }
            });
        }
    });
});

project.save();
