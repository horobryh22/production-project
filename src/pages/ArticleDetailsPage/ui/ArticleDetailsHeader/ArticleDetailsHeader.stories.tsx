import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleDetailsHeader } from './ArticleDetailsHeader';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

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
Primary.decorators = [StoreDecorator({ uiPage: { scroll: {} } })];
