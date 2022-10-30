import type { ComponentMeta, ComponentStory } from '@storybook/react';

import ProfilePage from './ProfilePage';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileError } from 'features/EditableProfileCard';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

export default {
    title: 'pages/Profile',
    component: ProfilePage,
    args: {},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Primary = Template.bind({});
Primary.decorators = [
    StoreDecorator({
        profile: {
            form: {
                age: 28,
                country: Country.RUSSIA,
                lastname: 'Хоробрых',
                username: 'admin',
                currency: Currency.RUB,
                avatar: '',
                city: 'Omsk',
                first: 'Илья',
            },
            readonly: true,
        },
    }),
];

export const EditMode = Template.bind({});
EditMode.decorators = [
    StoreDecorator({
        profile: {
            form: {
                age: 28,
                country: Country.RUSSIA,
                lastname: 'Хоробрых',
                username: 'admin',
                currency: Currency.RUB,
                avatar: '',
                city: 'Omsk',
                first: 'Илья',
            },
            readonly: false,
        },
    }),
];

export const WithValidateErrors = Template.bind({});
WithValidateErrors.decorators = [
    StoreDecorator({
        profile: {
            form: {
                age: 0,
                country: Country.RUSSIA,
                lastname: '',
                username: 'admin',
                currency: Currency.RUB,
                avatar: '',
                city: 'Omsk',
                first: '',
            },
            readonly: false,
            validateErrors: [
                ValidateProfileError.INCORRECT_USER_DATA,
                ValidateProfileError.INCORRECT_AGE,
            ],
        },
    }),
];
