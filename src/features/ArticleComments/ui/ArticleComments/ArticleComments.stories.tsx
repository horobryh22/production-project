import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleComments } from './ArticleComments';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

export default {
    title: 'features/ArticleComments',
    component: ArticleComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleComments>;

const comments = {
    ids: ['123', '234'],
    entities: {
        '123': {
            articleId: '1',
            text: 'It is a cool article',
            id: '123',
            user: {
                id: '1',
                username: 'admin',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
            },
        },
        '234': {
            articleId: '1',
            text: 'I agree with you. my friend',
            id: '123',
            user: {
                id: '1',
                username: 'user',
                avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
            },
        },
    },
};

const Template: ComponentStory<typeof ArticleComments> = args => (
    <ArticleComments {...args} />
);

export const Primary = Template.bind({});
Primary.args = { id: '1' };
Primary.decorators = [
    StoreDecorator({
        articleDetailsComments: comments,
    }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
    StoreDecorator({
        articleDetailsComments: { isLoading: true, ids: [], entities: {} },
    }),
];
