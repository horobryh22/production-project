import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { NotFoundPage } from './NotFoundPage';

export default {
    title: 'pages/NotFound',
    component: NotFoundPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = () => <NotFoundPage />;

export const NotFound = Template.bind({});
