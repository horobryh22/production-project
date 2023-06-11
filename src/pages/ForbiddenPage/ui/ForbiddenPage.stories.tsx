import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ForbiddenPage } from './ForbiddenPage';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

export default {
    title: 'pages/ForbiddenPage',
    component: ForbiddenPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ForbiddenPage>;

const Template: ComponentStory<typeof ForbiddenPage> = () => <ForbiddenPage />;

export const About = Template.bind({});
About.decorators = [StoreDecorator({})];
