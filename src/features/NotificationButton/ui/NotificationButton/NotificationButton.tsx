import React, { memo, ReactElement } from 'react';

import classes from './NotificationButton.module.scss';

import { NotificationList } from 'entities/Notification';
import notificationIcon from 'shared/assets/icons/notification.svg';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme, Icon, Popover } from 'shared/ui';

interface NotificationButtonProps {
    className?: string;
    userId: string;
}

export const NotificationButton = memo((props: NotificationButtonProps): ReactElement => {
    const { className, userId } = props;

    const triggerForPopover: JSX.Element = (
        <Button theme={ButtonTheme.CLEAR}>
            <Icon Svg={notificationIcon} theme={'inverted'} />
        </Button>
    );

    return (
        <Popover
            trigger={triggerForPopover}
            className={classNames(classes.NotificationButton, {}, [className])}
        >
            <NotificationList className={classes.notifications} userId={userId} />
        </Popover>
    );
});
