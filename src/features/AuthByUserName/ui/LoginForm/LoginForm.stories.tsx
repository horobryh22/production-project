import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoginForm } from './LoginForm';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = args => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.decorators = [
    StoreDecorator({
        login: {
            username: 'admin',
            password: '123',
        },
    }),
];

export const WithError = Template.bind({});
WithError.decorators = [
    StoreDecorator({
        login: {
            username: 'admin',
            password: '123',
            error: 'Enter the correct password or login',
        },
    }),
];

export const Loading = Template.bind({});
Loading.decorators = [
    StoreDecorator({
        login: {
            isLoading: true,
        },
    }),
];
