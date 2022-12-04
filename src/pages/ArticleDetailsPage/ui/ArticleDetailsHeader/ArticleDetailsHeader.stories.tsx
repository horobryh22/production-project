import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleDetailsHeader } from './ArticleDetailsHeader';

export default {
    title: 'pages/ArticleDetails/ArticleDetailsHeader',
    component: ArticleDetailsHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsHeader>;

const Template: ComponentStory<typeof ArticleDetailsHeader> = args => (
    <ArticleDetailsHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
