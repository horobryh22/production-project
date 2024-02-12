import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import { Notification } from '@/entities/Notification';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { NotificationButton } from './NotificationButton';

export default {
    title: 'features/NotificationButton',
    component: NotificationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        StoreDecorator({}),
        Story => (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {Story()}
            </div>
        ),
    ],
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = args => (
    <NotificationButton {...args} />
);

const notification: Notification = {
    href: '/admin',
    title: 'Тестовое уведомление',
    description: 'Просто тестовое уведомление',
    id: '1',
    user: {
        id: '1',
        username: '',
        avatar: '',
        roles: [],
    },
};

export const Primary = Template.bind({});
Primary.args = {
    userId: '1',
};
Primary.parameters = {
    msw: {
        handlers: [
            rest.get('/notifications', (req, res, ctx) =>
                res(
                    ctx.json([
                        notification,
                        { ...notification, id: '2' },
                        { ...notification, id: '3' },
                    ]),
                ),
            ),
        ],
    },
};

export const Loading = Template.bind({});
Loading.parameters = {
    msw: {
        handlers: [
            rest.get('/notifications', (req, res, ctx) =>
                res(
                    ctx.delay(1000 * 60 * 60 * 60),
                    ctx.json([
                        notification,
                        { ...notification, id: '2' },
                        { ...notification, id: '3' },
                    ]),
                ),
            ),
        ],
    },
};
