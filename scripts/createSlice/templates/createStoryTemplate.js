const changeFirstLetter = require('../helpers/changeFirstLetter');

module.exports = (layer, slice) => {
    const sliceNameUpperCase = changeFirstLetter(slice, 'upper');

    return `import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ${sliceNameUpperCase} } from './${sliceNameUpperCase}';

export default {
    title: '${layer}/${sliceNameUpperCase}',
    component: ${sliceNameUpperCase},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ${sliceNameUpperCase}>;

const Template: ComponentStory<typeof ${sliceNameUpperCase}> = args => <${sliceNameUpperCase} {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
`
};