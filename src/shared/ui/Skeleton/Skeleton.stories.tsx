import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Skeleton } from './Skeleton';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = args => <Skeleton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    height: '200px',
    width: '100%',
};

export const Circle = Template.bind({});
Circle.args = {
    height: 100,
    width: 100,
    border: '50%',
};
