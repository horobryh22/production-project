import type { ComponentMeta, ComponentStory } from '@storybook/react';

import ArticleEditPage from './ArticleEditPage';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

export default {
    title: 'pages/ArticleEditPage/ArticleEditPage',
    component: ArticleEditPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleEditPage>;

const Template: ComponentStory<typeof ArticleEditPage> = args => (
    <ArticleEditPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({ uiPage: { scroll: {} } })];
