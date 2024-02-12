import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { CommentForm } from './CommentForm';

export default {
    title: 'entities/CommentForm',
    component: CommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentForm>;

const Template: ComponentStory<typeof CommentForm> = args => <CommentForm {...args} />;

export const Primary = Template.bind({});
Primary.decorators = [
    StoreDecorator({
        commentForm: {
            text: 'Hello world',
        },
    }),
];

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
Loading.decorators = [
    StoreDecorator({
        commentForm: {
            text: 'Hello world',
        },
    }),
];
