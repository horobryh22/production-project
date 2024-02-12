import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleType } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { ArticleTypeTabs } from './ArticleTypeTabs';

export default {
    title: 'features/ArticlePageFilter/ArticleTypeTabs',
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
Primary.decorators = [
    StoreDecorator({
        articlesPageFilter: {
            typeTab: ArticleType.IT,
        },
    }),
];
