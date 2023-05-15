import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tabs } from './Tabs';

import { ArticleType } from 'entities/Article';

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = args => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    tabs: [
        { value: ArticleType.ECONOMICS, content: 'tab1' },
        { value: ArticleType.ALL, content: 'tab2' },
        { value: ArticleType.SCIENCE, content: 'tab3' },
    ],
    value: ArticleType.ECONOMICS,
    onTabClick: action('onTabClick'),
};
