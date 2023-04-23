import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Dropdown } from './Dropdown';

import { Button } from 'shared/ui';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = args => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    trigger: <Button>Open</Button>,
    items: [
        { content: 'first' },
        { content: 'second' },
        { content: 'third', disabled: true },
    ],
};
