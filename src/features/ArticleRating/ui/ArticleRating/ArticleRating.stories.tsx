import React from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import ArticleRating from './ArticleRating';

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = args => (
    <ArticleRating {...args} />
);

export const WithEstimate = Template.bind({});
export const WithoutEstimate = Template.bind({});

WithEstimate.parameters = {
    msw: {
        handlers: [
            rest.get('/article-rating?userId=1&articleId=1', (req, res, ctx) =>
                res(ctx.json([{ rating: 4 }])),
            ),
        ],
    },
};
