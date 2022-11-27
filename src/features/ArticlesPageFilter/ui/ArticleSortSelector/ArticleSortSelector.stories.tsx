import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleSortSelector } from './ArticleSortSelector';

import { ArticleSortType } from 'entities/Article';
import { SortOrder } from 'shared/types';

export default {
    title: 'features/ArticlePageFilter/ArticleSortSelector',
    component: ArticleSortSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = args => (
    <ArticleSortSelector {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    sort: ArticleSortType.TITLE,
    order: SortOrder.ASC,
    onChangeOrder: action('onChangeOrder'),
    onChangeSort: action('onChangeSort'),
};
