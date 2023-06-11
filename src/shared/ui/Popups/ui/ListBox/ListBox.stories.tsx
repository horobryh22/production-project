import { useState } from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListBox } from './ListBox';

import { Currency } from '@/entities/Currency';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => (
            <div style={{ paddingTop: '200px', paddingLeft: '200px' }}>{Story()}</div>
        ),
    ],
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

export const TopLeft = Template.bind({});
TopLeft.args = {
    direction: 'top left',
    items: [
        { content: Currency.RUB + ' валюта', value: Currency.RUB + ' валюта' },
        { content: Currency.USD + ' валюта', value: Currency.USD + ' валюта' },
        {
            content: Currency.EURO + ' валюта',
            value: Currency.EURO + ' валюта',
            disabled: true,
        },
    ],
};

export const TopRight = Template.bind({});
TopRight.args = {
    direction: 'top right',
    items: [
        { content: Currency.RUB + ' валюта', value: Currency.RUB + ' валюта' },
        { content: Currency.USD + ' валюта', value: Currency.USD + ' валюта' },
        {
            content: Currency.EURO + ' валюта',
            value: Currency.EURO + ' валюта',
            disabled: true,
        },
    ],
};

export const BottomRight = Template.bind({});
BottomRight.args = {
    direction: 'bottom right',
    items: [
        { content: Currency.RUB + ' валюта', value: Currency.RUB + ' валюта' },
        { content: Currency.USD + ' валюта', value: Currency.USD + ' валюта' },
        {
            content: Currency.EURO + ' валюта',
            value: Currency.EURO + ' валюта',
            disabled: true,
        },
    ],
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    direction: 'bottom left',
    items: [
        { content: Currency.RUB + ' валюта', value: Currency.RUB + ' валюта' },
        { content: Currency.USD + ' валюта', value: Currency.USD + ' валюта' },
        {
            content: Currency.EURO + ' валюта',
            value: Currency.EURO + ' валюта',
            disabled: true,
        },
    ],
};
