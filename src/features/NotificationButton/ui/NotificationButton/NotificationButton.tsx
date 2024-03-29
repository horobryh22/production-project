import React, { memo, ReactElement, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';

import { NotificationList } from '@/entities/Notification';
import { selectIsUserAuth } from '@/entities/User';
import notificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames, useIsDesktop } from '@/shared/lib';
import { Button, ButtonTheme, Drawer, Icon, Popover } from '@/shared/ui';

import classes from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
    userId: string;
}

export const NotificationButton = memo((props: NotificationButtonProps): ReactElement => {
    const { className, userId } = props;
    const isDesktop = useIsDesktop();

    const isAuth = useSelector(selectIsUserAuth);

    const [isOpen, setIsOpen] = useState(false);

    const onDrawerClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onDrawerOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const triggerForPopover = isAuth ? (
        <Button theme={ButtonTheme.CLEAR} onClick={onDrawerOpen}>
            <Icon Svg={notificationIcon} theme={'inverted'} />
        </Button>
    ) : null;

    const renderContent = () => {
        if (isDesktop) {
            return (
                <Popover
                    trigger={triggerForPopover}
                    className={classNames(classes.NotificationButton, {}, [className])}
                >
                    <NotificationList className={classes.notifications} userId={userId} />
                </Popover>
            );
        }

        return (
            <>
                {triggerForPopover}
                <Drawer className={className} isOpen={isOpen} onClose={onDrawerClose}>
                    <NotificationList className={classes.notifications} userId={userId} />
                </Drawer>
            </>
        );
    };

    return renderContent();
});
