import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Navbar as NavbarComponent } from './Navbar';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

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
        },
    }),
];

export const AuthNavbar = Template.bind({});
AuthNavbar.decorators = [
    StoreDecorator({
        user: {
            isUserAuth: true,
        },
    }),
];
