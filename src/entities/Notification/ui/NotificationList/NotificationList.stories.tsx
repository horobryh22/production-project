import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { Notification } from '../../model/types';

import { NotificationList } from './NotificationList';

export default {
    title: 'entities/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = args => (
    <div style={{ marginLeft: 'auto' }}>
        <NotificationList {...args} />
    </div>
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
