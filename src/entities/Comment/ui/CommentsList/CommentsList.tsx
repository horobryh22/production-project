import { ReactElement, memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { Text, VStack } from '@/shared/ui';

import { Comment } from '../../model/types';
import { CommentItem } from '../CommentItem/CommentItem';

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
            <CommentItem key={comment.id} comment={comment} isLoading={isLoading} />
        ));
    }, [comments, isLoading]);

    if (isLoading) {
        return (
            <VStack max gap={'8'} className={classNames('', {}, [className])}>
                <CommentItem isLoading />
                <CommentItem isLoading />
                <CommentItem isLoading />
            </VStack>
        );
    }

    return (
        <VStack max gap={'8'} className={classNames('', {}, [className])}>
            {mappedComments.length ? (
                mappedComments
            ) : (
                <Text text={t('No comments', { ns: 'article' })} />
            )}
        </VStack>
    );
});
