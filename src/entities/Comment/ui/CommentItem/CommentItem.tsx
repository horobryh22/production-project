import { memo, ReactElement } from 'react';

import { Comment } from '../../model/types';

import classes from './CommentItem.module.scss';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { classNames } from 'shared/lib';
import { Avatar, Text, Skeleton, AppLink } from 'shared/ui';

interface CommentItemProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentItem = memo((props: CommentItemProps): ReactElement => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div className={classNames(classes.CommentItem, {}, [className])}>
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
        <div className={classNames(classes.CommentItem, {}, [className])}>
            <AppLink
                to={`${RoutePath.profile}${comment.user.id}`}
                className={classes.header}
            >
                {comment.user.avatar && (
                    <Avatar
                        size={30}
                        className={classes.avatar}
                        src={comment.user.avatar}
                    />
                )}
                <Text title={comment.user.username} />
            </AppLink>
            <Text text={comment.text} />
        </div>
    );
});
