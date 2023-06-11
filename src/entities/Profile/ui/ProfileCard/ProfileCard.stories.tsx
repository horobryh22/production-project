import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProfileCard } from './ProfileCard';

import { Country } from '@/entities/Country/model/consts/consts';
import { Currency } from '@/entities/Currency';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    args: {
        data: {
            age: 28,
            country: Country.RUSSIA,
            lastname: 'Хоробрых',
            username: 'admin',
            currency: Currency.RUB,
            avatar: '',
            city: 'Omsk',
            first: 'Илья',
        },
    },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = args => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    readonly: true,
};

export const EditMode = Template.bind({});
EditMode.args = {
    readonly: false,
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};

export const WithError = Template.bind({});
WithError.args = {
    error: 'true',
};
