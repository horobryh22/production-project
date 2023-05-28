import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Drawer } from './Drawer';

import { Notification } from 'entities/Notification/model/types';
import { NotificationItem } from 'entities/Notification/ui/NotificationItem/NotificationItem';
import { VStack } from 'shared/ui';

export default {
    title: 'shared/Drawer',
    component: Drawer,
    args: {
        testMode: true,
    },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = args => <Drawer {...args} />;

const notifications: Notification = {
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

export const DrawerOpen = Template.bind({});
DrawerOpen.args = {
    isOpen: true,
    children: (
        <VStack max gap={'16'}>
            <NotificationItem item={notifications} />
            <NotificationItem item={notifications} />
            <NotificationItem item={notifications} />
        </VStack>
    ),
};
