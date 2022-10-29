import { useState } from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => {
    const [value, setValue] = useState('3');

    return <Select {...args} onChange={setValue} value={value} />;
};

export const Primary = Template.bind({});

Primary.args = {
    label: 'Choose your country',
    options: [
        { content: 'Russia', value: '1' },
        { content: 'India', value: '2' },
        { content: 'USA', value: '3' },
    ],
};
