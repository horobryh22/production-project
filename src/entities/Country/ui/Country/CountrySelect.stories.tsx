import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '../../model/types';
import { CountrySelect } from '../Country/CountrySelect';

export default {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = args => (
    <CountrySelect {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
    readonly: false,
    value: Country.USA,
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
    readonly: true,
    value: Country.RUSSIA,
};
