import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Comment } from '../../model/types';

import { CommentItem } from './CommentItem';

export default {
    title: 'entities/CommentItem',
    component: CommentItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentItem>;

const Template: ComponentStory<typeof CommentItem> = args => <CommentItem {...args} />;

const comment: Comment = {
    id: '1',
    user: {
        id: '1',
        username: 'admin',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
    },
    articleId: '1',
    text: 'test comment',
};

export const Primary = Template.bind({});
Primary.args = {
    comment,
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
