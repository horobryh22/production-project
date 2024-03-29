import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { ArticlesFilterBlock } from './ArticlesFilterBlock';

export default {
    title: 'features/ArticlePageFilter/ArticlesFilterBlock',
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
Primary.decorators = [
    StoreDecorator({
        articlesPageFilter: {
            _inited: true,
        },
    }),
];
