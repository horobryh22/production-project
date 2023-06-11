import React, { memo, ReactElement, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';

import classes from './NotificationButton.module.scss';

import { NotificationList } from '@/entities/Notification';
import { selectIsUserAuth } from '@/entities/User';
import notificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames, useIsDesktop } from '@/shared/lib';
import { AnimationProvider } from '@/shared/lib/providers';
import { Button, ButtonTheme, Drawer, Icon, Popover } from '@/shared/ui';

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

    /*TODO по хорошему здесь в дальнейшем применить библиотеку loadable,
       которая позволяет не загружать компонент, если он отрисовывается по условию*/
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
                <AnimationProvider>
                    <Drawer className={className} isOpen={isOpen} onClose={onDrawerClose}>
                        <NotificationList
                            className={classes.notifications}
                            userId={userId}
                        />
                    </Drawer>
                </AnimationProvider>
            </>
        );
    };

    return renderContent();
});
