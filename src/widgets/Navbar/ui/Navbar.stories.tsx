import type { ComponentMeta, ComponentStory } from '@storybook/react';

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
