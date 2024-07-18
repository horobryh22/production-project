import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

import { ThemeSwitcher as ThemeSwitcherComponent } from './ThemeSwitcher';

export default {
    title: 'widgets/ThemeSwitcher',
    component: ThemeSwitcherComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ThemeSwitcherComponent>;

const Template: ComponentStory<typeof ThemeSwitcherComponent> = args => (
    <ThemeSwitcherComponent {...args} />
);

export const ThemeSwitcher = Template.bind({});
ThemeSwitcher.decorators = [
    ThemeDecorator(),
    StoreDecorator({
        user: { authData: { id: '1' } },
    }),
];
