import { memo, ReactElement } from 'react';

import { getRouteMain, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib';
import { Mods } from '@/shared/lib/classNames/classNames';
import { Avatar, Text, Skeleton, AppLink } from '@/shared/ui';

import { Comment } from '../../model/types';

import classes from './CommentItem.module.scss';

interface CommentItemProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentItem = memo((props: CommentItemProps): ReactElement => {
    const { className, comment, isLoading } = props;

    const mods: Mods = {
        [classes.loading]: isLoading,
    };

    if (isLoading) {
        return (
            <div className={classNames(classes.CommentItem, mods, [className])}>
                <div className={classes.header}>
                    <Skeleton
                        width={30}
                        className={classes.avatar}
                        height={30}
                        border="50%"
                    />
                    <Skeleton width={100} height={20} />
                </div>
                <Skeleton width="100%" height={30} />
            </div>
        );
    }

    return (
        <div
            data-testid={'CommentList.Item'}
            className={classNames(classes.CommentItem, {}, [className])}
        >
            <AppLink
                to={
                    comment?.user?.id
                        ? getRouteProfile(comment?.user?.id)
                        : getRouteMain()
                }
                className={classes.header}
            >
                {comment?.user?.avatar && (
                    <Avatar
                        size={30}
                        className={classes.avatar}
                        src={comment?.user?.avatar}
                    />
                )}
                <Text title={comment?.user?.username} />
            </AppLink>
            <Text text={comment?.text} />
        </div>
    );
});
