import { JsxAttribute, Node, SyntaxKind } from 'ts-morph';

// variables
const TOGGLE_COMPONENT = 'ToggleFeature';

const getAttributeNodeByName = (attributes: JsxAttribute[], name: string) => {
    return attributes.find(node => node.getName() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();

    if (value?.startsWith('(')) {
        return value.slice(1, -1);
    }

    return value;
};

export const toggleComponent = (node: Node, flag: string, featureName: string) => {
    if (
        !node.wasForgotten() &&
        node.isKind(SyntaxKind.JsxSelfClosingElement) &&
        node.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText() ===
            TOGGLE_COMPONENT
    ) {
        const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

        const onAttribute = getAttributeNodeByName(attributes, 'on');
        const offAttribute = getAttributeNodeByName(attributes, 'off');
        const featureAttribute = getAttributeNodeByName(attributes, 'feature');

        const feature = featureAttribute
            ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
            ?.getLiteralValue();

        if (feature !== featureName) {
            return;
        }

        if (flag === 'on') {
            node.replaceWithText(getReplacedComponent(onAttribute) ?? '');
        }

        if (flag === 'off') {
            node.replaceWithText(getReplacedComponent(offAttribute) ?? '');
        }
    }
};
