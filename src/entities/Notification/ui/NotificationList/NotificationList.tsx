import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib';
import { Skeleton, VStack } from '@/shared/ui';

import { useNotifications } from '../../api/notificationsAPI';
import { NotificationItem } from '../NotificationItem/NotificationItem';

import classes from './NotificationList.module.scss';

interface NotificationListProps {
    className?: string;
    userId: string;
}

export const NotificationList = memo(
    (props: NotificationListProps): ReactElement | null => {
        const { className, userId } = props;

        const { isLoading, data: notifications = [] } = useNotifications(userId, {
            pollingInterval: 10000,
        });

        if (!notifications && !isLoading) {
            return null;
        }

        const mappedNotifications = notifications.map(notification => {
            return <NotificationItem key={notification.id} item={notification} />;
        });

        const renderContent = (): ReactElement | ReactElement[] => {
            if (isLoading) {
                return (
                    <>
                        <Skeleton height={50} width={'100%'} border={8} />
                        <Skeleton height={50} width={'100%'} border={8} />
                        <Skeleton height={50} width={'100%'} border={8} />
                    </>
                );
            }

            return mappedNotifications;
        };

        return (
            <VStack
                max
                gap={'8'}
                className={classNames(classes.NotificationList, {}, [className])}
            >
                {renderContent()}
            </VStack>
        );
    },
);
