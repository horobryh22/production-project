import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ViewSwitcher } from './ViewSwitcher';

import { ArticleView } from 'entities/Article';

export default {
    title: 'widgets/ViewSwitcher',
    component: ViewSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ViewSwitcher>;

const Template: ComponentStory<typeof ViewSwitcher> = args => <ViewSwitcher {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    view: ArticleView.TILE,
};
