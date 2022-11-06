import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Comment } from '../../model/types';

import { CommentsList } from './CommentsList';

export default {
    title: 'entities/CommentsList',
    component: CommentsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentsList>;

const Template: ComponentStory<typeof CommentsList> = args => <CommentsList {...args} />;

const comments: Comment[] = [
    {
        id: '1',
        user: {
            id: '1',
            username: 'admin',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
        },
        articleId: '1',
        text: 'test comment',
    },
    {
        id: '1',
        user: {
            id: '1',
            username: 'admin',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
        },
        articleId: '1',
        text: 'test comment',
    },
];

export const Primary = Template.bind({});
Primary.args = {
    comments,
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
    comments,
};
