import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Sidebar as SidebarComponent } from './Sidebar';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

export default {
    title: 'widgets/Sidebar',
    component: SidebarComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SidebarComponent>;

const Template: ComponentStory<typeof SidebarComponent> = args => (
    <SidebarComponent {...args} />
);

export const AuthUser = Template.bind({});
AuthUser.decorators = [
    StoreDecorator({
        user: {
            isUserAuth: true,
        },
    }),
];

export const WithoutAuth = Template.bind({});
WithoutAuth.decorators = [
    StoreDecorator({
        user: {
            isUserAuth: false,
        },
    }),
];
