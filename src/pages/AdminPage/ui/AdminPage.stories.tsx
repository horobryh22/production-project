import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import AdminPage from './AdminPage';

export default {
    title: 'pages/Admin',
    component: AdminPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AdminPage>;

const Template: ComponentStory<typeof AdminPage> = () => <AdminPage />;

export const About = Template.bind({});
About.decorators = [StoreDecorator({})];
