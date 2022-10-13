import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, ThemeButton } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    args: {
        children: 'Button',
    },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = Template.bind({});

export const Clear = Template.bind({});
Clear.args = {
    theme: ThemeButton.CLEAR,
};

export const Outline = Template.bind({});
Outline.args = {
    theme: ThemeButton.OUTLINE,
};
