import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Text, TextSize, TextTheme } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Hello',
    text: 'Description description',
};

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Hello',
    text: 'Description description',
    size: TextSize.L,
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'Description description',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Hello',
};

export const Error = Template.bind({});
Error.args = {
    title: 'Hello',
    text: 'Description description',
    theme: TextTheme.ERROR,
};
