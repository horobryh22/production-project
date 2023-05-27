import { memo, ReactElement } from 'react';

import { Notification } from '../../model/types';

import classes from './NotificationItem.module.scss';

import { classNames } from 'shared/lib';
import { AppLink, Card, Text } from 'shared/ui';
import { CardTheme } from 'shared/ui/Card/Card';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps): ReactElement => {
    const { className, item } = props;

    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(classes.NotificationItem, {}, [className])}
        >
            <Text title={item.title} />
            <Text text={item.description} />
        </Card>
    );

    if (item.href) {
        return (
            <AppLink to={item.href} target={'_blank'} className={classes.link}>
                {content}
            </AppLink>
        );
    }

    return content;
});
