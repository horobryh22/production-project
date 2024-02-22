import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    args: {
        src: 'https://cdn-icons-png.flaticon.com/512/168/168882.png',
    },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    size: 100,
};

export const Small = Template.bind({});
Small.args = {
    size: 50,
};

export const AvatarLoadingError = Template.bind({});
AvatarLoadingError.args = {
    size: 50,
    src: 'invalid_url',
};
