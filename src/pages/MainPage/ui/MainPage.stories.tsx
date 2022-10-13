import type { ComponentMeta, ComponentStory } from '@storybook/react';

import MainPage from './MainPage';

export default {
    title: 'pages/Main',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = () => <MainPage />;

export const Main = Template.bind({});
