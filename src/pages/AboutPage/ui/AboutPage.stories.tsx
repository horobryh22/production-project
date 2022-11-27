import type { ComponentMeta, ComponentStory } from '@storybook/react';

import AboutPage from './AboutPage';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

export default {
    title: 'pages/About',
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />;

export const About = Template.bind({});
About.decorators = [StoreDecorator({})];
