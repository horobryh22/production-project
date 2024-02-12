import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ValidateProfileError } from '@/features/EditableProfileCard';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import ProfilePage from './ProfilePage';

export default {
    title: 'pages/Profile',
    component: ProfilePage,
    args: {},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [],
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
                id: '1',
            },
            readonly: true,
        },
        user: {
            authData: {
                id: '1',
            },
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
                id: '1',
            },
            readonly: false,
        },
        user: {
            authData: {
                id: '1',
            },
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
                id: '1',
            },
            readonly: false,
            validateErrors: [
                ValidateProfileError.INCORRECT_USER_DATA,
                ValidateProfileError.INCORRECT_AGE,
            ],
        },
        user: {
            authData: {
                id: '1',
            },
        },
    }),
];
