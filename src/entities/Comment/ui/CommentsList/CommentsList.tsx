import { ReactElement, memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { Comment } from '../../model/types';
import { CommentItem } from '../CommentItem/CommentItem';

import classes from './CommentsList.module.scss';

import { classNames } from 'shared/lib';
import { Text } from 'shared/ui';

interface CommentsListProps {
    className?: string;
    comments: Comment[];
    isLoading?: boolean;
}

export const CommentsList = memo((props: CommentsListProps): ReactElement => {
    const { className, comments, isLoading } = props;
    const { t } = useTranslation('article');

    const mappedComments = useMemo(() => {
        return comments?.map(comment => (
            <CommentItem
                key={comment.id}
                comment={comment}
                isLoading={isLoading}
                className={classes.comment}
            />
        ));
    }, [comments, isLoading]);

    if (isLoading) {
        return (
            <div className={classNames(classes.CommentsList, {}, [className])}>
                <CommentItem isLoading />
                <CommentItem isLoading />
                <CommentItem isLoading />
            </div>
        );
    }

    return (
        <div className={classNames(classes.CommentsList, {}, [className])}>
            {mappedComments.length ? (
                mappedComments
            ) : (
                <Text text={t('No comments', { ns: 'article' })} />
            )}
        </div>
    );
});
