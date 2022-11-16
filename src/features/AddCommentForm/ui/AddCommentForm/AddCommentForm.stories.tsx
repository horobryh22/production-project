import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import AddCommentForm from './AddCommentForm';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

export default {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = args => (
    <AddCommentForm {...args} />
);

export const Primary = Template.bind({});
Primary.decorators = [StoreDecorator({ addCommentForm: { text: 'Some text' } })];
Primary.args = {
    onSendComment: action('onSendComment'),
};

export const Loading = Template.bind({});
Loading.decorators = [StoreDecorator({})];
Loading.args = { isLoading: true };
