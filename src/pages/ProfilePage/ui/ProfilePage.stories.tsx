import type { ComponentMeta, ComponentStory } from '@storybook/react';

import ProfilePage from './ProfilePage';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

export default {
    title: 'pages/Profile',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Profile = Template.bind({});
Profile.decorators = [StoreDecorator({})];
