import { memo, ReactElement, useCallback, useMemo, Suspense } from 'react';

import { useSelector } from 'react-redux';

import { AddCommentFormAsync } from '../../../AddCommentForm/';
import { selectArticleDetailsCommentsIsLoading } from '../../model/selectors/selectArticleDetailsCommentsIsLoading/selectArticleDetailsCommentsIsLoading';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    articleDetailsCommentsReducer,
    commentsSelectors,
} from '../../model/slice/articleDetailsCommentsSlice';

import classes from './ArticleComments.module.scss';

import { CommentsList } from 'entities/Comment';
import {
    classNames,
    useAppDispatch,
    useDynamicModuleLoader,
    useInitialEffect,
} from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Loader } from 'shared/ui';

interface ArticleCommentsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

export const ArticleComments = memo((props: ArticleCommentsProps): ReactElement => {
    const { className, id } = props;

    const dispatch = useAppDispatch();

    const comments = useSelector(commentsSelectors.selectAll);
    const isLoading = useSelector(selectArticleDetailsCommentsIsLoading);

    useDynamicModuleLoader(reducers);

    useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

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
        <div className={classNames(classes.ArticleComments, {}, [className])}>
            <Suspense fallback={<Loader className={classes.loader} />}>
                <AddCommentFormAsync
                    onSendComment={onSendComment}
                    isLoading={isLoading}
                />
            </Suspense>
            <CommentsList comments={reversedComments} isLoading={isLoading} />
        </div>
    );
});
