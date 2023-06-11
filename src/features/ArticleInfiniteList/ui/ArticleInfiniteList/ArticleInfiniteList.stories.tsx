import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleInfiniteList } from './ArticleInfiniteList';

import { Article, ArticleType, ArticleView } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

export default {
    title: 'features/ArticleInfiniteList',
    component: ArticleInfiniteList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleInfiniteList>;

const Template: ComponentStory<typeof ArticleInfiniteList> = args => (
    <ArticleInfiniteList {...args} />
);

const article: Article = {
    id: '1',
    title: 'Javascript news',
    user: {
        id: '1',
        username: 'Ilya',
    },
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: [ArticleType.IT],
    blocks: [],
};

export const Primary = Template.bind({});
Primary.args = {
    view: ArticleView.TILE,
};
Primary.decorators = [
    StoreDecorator({
        articleInfiniteList: {
            limit: 9,
            ids: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
            entities: {
                '1': article,
                '2': { ...article, id: '2' },
                '3': { ...article, id: '3' },
                '4': { ...article, id: '4' },
                '5': { ...article, id: '5' },
                '6': { ...article, id: '6' },
                '7': { ...article, id: '7' },
                '8': { ...article, id: '8' },
                '9': { ...article, id: '9' },
                '10': { ...article, id: '10' },
                '11': { ...article, id: '11' },
                '12': { ...article, id: '12' },
                '13': { ...article, id: '13' },
            },
            hasMore: false,
            page: 1,
            isLoading: false,
        },
    }),
];
