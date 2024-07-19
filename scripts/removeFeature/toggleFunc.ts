import { Node, SyntaxKind } from 'ts-morph';

// variables
const TOGGLE_FUNCTION = 'toggleFeature';

const isToggleFunc = (node: Node) => {
    let isToggledFeature = false;

    node.forEachChild(child => {
        if (
            child.isKind(SyntaxKind.PropertyAccessExpression) &&
            child.getName() === TOGGLE_FUNCTION
        ) {
            isToggledFeature = true;
        }
    });

    return isToggledFeature;
};

const replaceToggleFunction = (node: Node, flag: string, featureName: string) => {
    // в нужной ноде получаем объект (аргумент), который передаем при вызове функции toggleFeature
    const objectOptions = node.getFirstDescendantByKind(
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
        ?.getLiteralValue();

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

    // изменяем значение в зависимости от флага
    if (flag === 'on') {
        node.replaceWithText(onResult ?? '');
    }

    if (flag === 'off') {
        node.replaceWithText(offResult ?? '');
    }
};

export const toggleFunc = (node: Node, flag: string, featureName: string) => {
    // в файле ищем все ноды которые являются вызовом функции и среди них ищем нужную нам
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunc(node)) {
        replaceToggleFunction(node, flag, featureName);
    }
};
