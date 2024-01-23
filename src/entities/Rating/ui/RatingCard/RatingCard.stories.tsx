import { withActions } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { RatingCard } from './RatingCard';

export default {
    title: 'entities/RatingCard',
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withActions],
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = args => <RatingCard {...args} />;

export const WithFeedback = Template.bind({});
WithFeedback.args = {
    withFeedback: true,
    text: 'Оцените нашу статью',
    feedbackTitle: 'Ваше мнение важно для нас',
};

export const WithoutFeedback = Template.bind({});
WithoutFeedback.args = {
    text: 'Оцените нашу статью',
};

export const StarRatingSelected = Template.bind({});
StarRatingSelected.args = {
    text: 'Оцените нашу статью',
    rating: 4,
};
