import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StarRating } from '@/shared/ui/StarRating/StarRating';

export default {
    title: 'shared/StarRating',
    component: StarRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = args => <StarRating {...args} />;

export const RatingSelected = Template.bind({});
RatingSelected.args = {
    selectedStars: 4,
};

export const RatingNotSelected = Template.bind({});
RatingNotSelected.args = {};
