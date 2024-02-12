import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { UserRole } from '@/entities/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { Navbar as NavbarComponent } from './Navbar';

export default {
    title: 'widgets/Navbar',
    component: NavbarComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NavbarComponent>;

const Template: ComponentStory<typeof NavbarComponent> = args => (
    <NavbarComponent {...args} />
);

export const Navbar = Template.bind({});
Navbar.decorators = [
    StoreDecorator({
        user: {
            isUserAuth: false,
            authData: {
                roles: [],
            },
        },
    }),
];

export const AuthNavbar = Template.bind({});
AuthNavbar.decorators = [
    StoreDecorator({
        user: {
            isUserAuth: true,
            authData: {
                roles: [UserRole.ADMIN],
                username: 'admin',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
                id: '1',
            },
        },
    }),
];
