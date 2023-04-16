import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = args => <Flex {...args} />;

const children = (
    <>
        <div style={{ border: '1px solid', padding: '5px', width: '20px' }}>1</div>
        <div style={{ border: '1px solid', padding: '5px', width: '20px' }}>2</div>
        <div style={{ border: '1px solid', padding: '5px', width: '20px' }}>3</div>
        <div style={{ border: '1px solid', padding: '5px', width: '20px' }}>4</div>
    </>
);

export const Row = Template.bind({});
Row.args = {
    children,
    direction: 'row',
    gap: '4',
    justify: 'start',
};

export const Column = Template.bind({});
Column.args = {
    children,
    direction: 'column',
    align: 'start',
    gap: '16',
};
