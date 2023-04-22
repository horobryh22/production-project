import { useState } from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListBox } from './ListBox';

import { Currency } from 'entities/Currency';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = args => {
    const [value, setValue] = useState('RUB');

    return (
        <ListBox
            {...args}
            value={value}
            defaultValue={'Выберите значение'}
            onChange={setValue}
        />
    );
};

export const Primary = Template.bind({});
Primary.args = {
    items: [
        { content: Currency.RUB, value: Currency.RUB },
        { content: Currency.USD, value: Currency.USD },
        { content: Currency.EURO, value: Currency.EURO, disabled: true },
    ],
};
