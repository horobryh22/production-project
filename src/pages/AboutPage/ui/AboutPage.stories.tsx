import type { ComponentMeta, ComponentStory } from '@storybook/react';

import AboutPage from './AboutPage';

export default {
    title: 'pages/About',
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />;

export const About = Template.bind({});
