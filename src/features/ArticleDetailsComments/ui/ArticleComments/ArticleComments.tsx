import { memo, ReactElement, useCallback, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { selectArticleDetailsCommentsIsLoading } from '../../model/selectors/selectArticleDetailsCommentsIsLoading/selectArticleDetailsCommentsIsLoading';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    articleDetailsCommentsReducer,
    commentsSelectors,
} from '../../model/slice/articleDetailsCommentsSlice';

import { CommentsList } from 'entities/Comment';
import { AddCommentFormAsync } from 'features/AddCommentForm';
import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';

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
        <div className={classNames('', {}, [className])}>
            <AddCommentFormAsync onSendComment={onSendComment} isLoading={isLoading} />
            <CommentsList comments={reversedComments} isLoading={isLoading} />
        </div>
    );
});
