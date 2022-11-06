import { ReactElement, memo, useMemo } from 'react';

import { Comment } from '../../model/types';
import { CommentItem } from '../CommentItem/CommentItem';

import classes from './CommentsList.module.scss';

import { classNames } from 'shared/lib';

interface CommentsListProps {
    className?: string;
    comments: Comment[];
    isLoading?: boolean;
}

export const CommentsList = memo((props: CommentsListProps): ReactElement => {
    const { className, comments, isLoading } = props;

    const mappedComments = useMemo(() => {
        return comments.map(comment => (
            <CommentItem
                key={comment.id}
                comment={comment}
                isLoading={isLoading}
                className={classes.comment}
            />
        ));
    }, [comments, isLoading]);

    return (
        <div className={classNames(classes.CommentsList, {}, [className])}>
            {mappedComments}
        </div>
    );
});
