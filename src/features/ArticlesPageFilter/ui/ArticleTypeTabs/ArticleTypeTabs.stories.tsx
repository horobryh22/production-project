import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleTypeTabs } from './ArticleTypeTabs';

export default {
    title: 'shared/ArticleTypeTabs',
    component: ArticleTypeTabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = args => (
    <ArticleTypeTabs {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};