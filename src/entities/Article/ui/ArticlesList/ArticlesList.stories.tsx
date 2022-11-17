import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticlesList } from './ArticlesList';

export default {
    title: 'shared/ArticlesList',
    component: ArticlesList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesList>;

const Template: ComponentStory<typeof ArticlesList> = args => <ArticlesList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
