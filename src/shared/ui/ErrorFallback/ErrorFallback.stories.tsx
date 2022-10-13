import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ErrorFallback } from './ErrorFallback';

export default {
    title: 'shared/ErrorPage',
    component: ErrorFallback,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ErrorFallback>;

const Template: ComponentStory<typeof ErrorFallback> = args => (
    <ErrorFallback {...args} />
);

export const ErrorPage = Template.bind({});
