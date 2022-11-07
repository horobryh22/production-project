import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { selectArticleDetailsCommentsIsLoading } from '../../model/selectors/selectArticleDetailsCommentsIsLoading/selectArticleDetailsCommentsIsLoading';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    articleDetailsCommentsReducer,
    commentsSelectors,
} from '../../model/slice/articleDetailsCommentsSlice';

import { CommentsList } from 'entities/Comment';
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

    return (
        <div className={classNames('', {}, [className])}>
            <CommentsList comments={comments} isLoading={isLoading} />
        </div>
    );
});
