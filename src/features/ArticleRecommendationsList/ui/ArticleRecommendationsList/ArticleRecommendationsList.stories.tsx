import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

import { ArticleType } from 'entities/Article';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = args => (
    <ArticleRecommendationsList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({
        articleRecommendations: {
            isLoading: false,
            ids: ['1', '2', '3', '4'],
            entities: {
                '1': {
                    user: { id: '1', username: 'admin', avatar: 'avatar' },
                    type: [ArticleType.IT],
                    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
                    blocks: [],
                    title: 'article',
                    createdAt: '2022',
                    views: 2000,
                    subtitle: '',
                    id: '1',
                },
                '2': {
                    user: { id: '1', username: 'admin', avatar: 'avatar' },
                    type: [ArticleType.IT],
                    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
                    blocks: [],
                    title: 'article',
                    createdAt: '2022',
                    views: 2000,
                    subtitle: '',
                    id: '2',
                },
                '3': {
                    user: { id: '1', username: 'admin', avatar: 'avatar' },
                    type: [ArticleType.IT],
                    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
                    blocks: [],
                    title: 'article',
                    createdAt: '2022',
                    views: 2000,
                    subtitle: '',
                    id: '3',
                },
                '4': {
                    user: { id: '1', username: 'admin', avatar: 'avatar' },
                    type: [ArticleType.IT],
                    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
                    blocks: [],
                    title: 'article',
                    createdAt: '2022',
                    views: 2000,
                    subtitle: '',
                    id: '4',
                },
            },
        },
    }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
    StoreDecorator({
        articleRecommendations: {
            isLoading: true,
            ids: [],
            entities: {},
        },
    }),
];
