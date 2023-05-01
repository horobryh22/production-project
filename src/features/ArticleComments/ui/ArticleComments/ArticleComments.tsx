import { memo, ReactElement, Suspense, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectArticleCommentsIsLoading } from '../../model/selectors/selectArticleCommentsIsLoading/selectArticleCommentsIsLoading';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    articleCommentsReducer,
    commentsSelectors,
} from '../../model/slice/articleCommentsSlice';

import classes from './ArticleComments.module.scss';

import { CommentFormAsync, CommentsList } from 'entities/Comment';
import {
    classNames,
    useAppDispatch,
    useDynamicModuleLoader,
    useInitialEffect,
} from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Loader, Text, TextSize, VStack } from 'shared/ui';

interface ArticleCommentsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleCommentsReducer,
};

export const ArticleComments = memo((props: ArticleCommentsProps): ReactElement => {
    const { className, id } = props;
    const { t } = useTranslation('article');

    const dispatch = useAppDispatch();

    const comments = useSelector(commentsSelectors.selectAll);
    const isLoading = useSelector(selectArticleCommentsIsLoading);

    useDynamicModuleLoader(reducers);

    useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)), []);

    const reversedComments = useMemo(() => {
        return [...comments].reverse();
    }, [comments]);

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    return (
        <VStack max gap={'16'} className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                className={classes.commentTitle}
                title={t('Comments', { ns: 'article' })}
            />
            <Suspense fallback={<Loader className={classes.loader} />}>
                <CommentFormAsync onSendComment={onSendComment} isLoading={isLoading} />
            </Suspense>
            <CommentsList comments={reversedComments} isLoading={isLoading} />
        </VStack>
    );
});
