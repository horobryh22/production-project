import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticlesFilterBlock } from './ArticlesFilterBlock';

export default {
    title: 'shared/ArticlesFilterBlock',
    component: ArticlesFilterBlock,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesFilterBlock>;

const Template: ComponentStory<typeof ArticlesFilterBlock> = args => (
    <ArticlesFilterBlock {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
