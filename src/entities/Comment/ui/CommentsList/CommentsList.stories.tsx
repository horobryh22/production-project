import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { CommentsList } from './CommentsList';

export default {
    title: 'shared/CommentsList',
    component: CommentsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentsList>;

const Template: ComponentStory<typeof CommentsList> = args => <CommentsList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
