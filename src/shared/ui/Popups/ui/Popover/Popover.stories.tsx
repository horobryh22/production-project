import React from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { Notification } from '@/entities/Notification';
import { NotificationItem } from '@/entities/Notification';
import notificationIcon from '@/shared/assets/icons/notification.svg';
import { Button, ButtonTheme, Icon, VStack } from '@/shared/ui';

import { Popover } from './Popover';

export default {
    title: 'shared/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {Story()}
            </div>
        ),
    ],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = args => <Popover {...args} />;

const notification: Notification = {
    user: {
        id: '1',
        username: '',
        roles: [],
        avatar: '',
    },
    id: '1',
    title: 'Простое уведомление',
    description: 'Текст простого уведомления',
    href: '/admin',
};

export const Primary = Template.bind({});
Primary.args = {
    trigger: (
        <Button theme={ButtonTheme.CLEAR}>
            <Icon Svg={notificationIcon} theme={'inverted'} />
        </Button>
    ),
    children: (
        <VStack max gap={'16'}>
            <NotificationItem item={notification} />
            <NotificationItem item={notification} />
        </VStack>
    ),
};
