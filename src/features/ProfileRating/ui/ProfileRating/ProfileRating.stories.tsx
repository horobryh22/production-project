import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import ProfileRating from './ProfileRating';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

export default {
    title: 'features/ProfileRating',
    component: ProfileRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ProfileRating>;

const Template: ComponentStory<typeof ProfileRating> = args => (
    <ProfileRating {...args} />
);

export const WithEstimate = Template.bind({});
export const WithoutEstimate = Template.bind({});

WithEstimate.parameters = {
    msw: {
        handlers: [
            rest.get('/profile-rating?userId=1&articleId=1', (req, res, ctx) =>
                res(ctx.json([{ rating: 2 }])),
            ),
        ],
    },
};
