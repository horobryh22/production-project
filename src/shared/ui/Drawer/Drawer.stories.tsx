import { useState } from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Drawer } from './Drawer';

import { Notification } from '@/entities/Notification/model/types';
import { NotificationItem } from '@/entities/Notification/ui/NotificationItem/NotificationItem';
import { Button, VStack } from '@/shared/ui';

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

const Template: ComponentStory<typeof Drawer> = args => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = () => setIsOpen(true);
    const onCloseDrawer = () => setIsOpen(false);

    return (
        <>
            <Button onClick={onOpenDrawer}>Open Drawer</Button>
            <Drawer {...args} isOpen={isOpen} onClose={onCloseDrawer} />
        </>
    );
};

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

export const ToggledDrawer = Template.bind({});
ToggledDrawer.args = {
    isOpen: true,
    children: (
        <VStack max gap={'16'}>
            <NotificationItem item={notifications} />
            <NotificationItem item={notifications} />
            <NotificationItem item={notifications} />
        </VStack>
    ),
};
