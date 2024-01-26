import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import ArticleRecommendationsList from './ArticleRecommendationsList';

import { ArticleType } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

const article = {
    user: { id: '1', username: 'admin', avatar: 'avatar' },
    type: [ArticleType.IT],
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    blocks: [],
    title: 'article',
    createdAt: '2022',
    views: 2000,
    subtitle: '',
    id: '1',
};

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = args => (
    <ArticleRecommendationsList {...args} />
);

export const Primary = Template.bind({});
Primary.parameters = {
    msw: {
        handlers: [
            rest.get('/articles', (req, res, ctx) =>
                res(
                    ctx.json([
                        article,
                        { ...article, id: '2' },
                        { ...article, id: '3' },
                        { ...article, id: '4' },
                        { ...article, id: '5' },
                        { ...article, id: '6' },
                    ]),
                ),
            ),
        ],
    },
};

export const Loading = Template.bind({});
Loading.parameters = {
    msw: {
        handlers: [
            rest.get('/articles', (req, res, ctx) =>
                res(
                    ctx.delay(1000 * 60 * 60 * 60),
                    ctx.json([
                        article,
                        { ...article, id: '2' },
                        { ...article, id: '3' },
                        { ...article, id: '4' },
                        { ...article, id: '5' },
                        { ...article, id: '6' },
                    ]),
                ),
            ),
        ],
    },
};
