import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Sidebar as SidebarComponent } from './Sidebar';

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

export const Sidebar = Template.bind({});
