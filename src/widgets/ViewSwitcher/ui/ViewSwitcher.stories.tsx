import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleView } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { ViewSwitcher } from './ViewSwitcher';

export default {
    title: 'widgets/ViewSwitcher',
    component: ViewSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ViewSwitcher>;

const Template: ComponentStory<typeof ViewSwitcher> = args => <ViewSwitcher {...args} />;

export const Primary = Template.bind({});
Primary.decorators = [
    StoreDecorator({
        viewSwitcher: {
            view: ArticleView.TILE,
            _inited: true,
        },
    }),
];
