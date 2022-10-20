import { useState } from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Input } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => {
    const [value, setValue] = useState('');

    return <Input {...args} value={value} onChange={setValue} />;
};

export const Primary = Template.bind({});

Primary.args = {
    placeholder: 'Enter something',
    autoFocus: true,
};
