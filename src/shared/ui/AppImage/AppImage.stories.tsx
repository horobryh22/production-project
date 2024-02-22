import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AppImage } from './AppImage';

export default {
    title: 'shared/Image',
    component: AppImage,
    args: {},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppImage>;

const Template: ComponentStory<typeof AppImage> = args => <AppImage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {};
