import type { ComponentMeta, ComponentStory } from '@storybook/react';

import CommentForm from './CommentForm';

export default {
    title: 'shared/CommentForm',
    component: CommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentForm>;

const Template: ComponentStory<typeof CommentForm> = args => <CommentForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
