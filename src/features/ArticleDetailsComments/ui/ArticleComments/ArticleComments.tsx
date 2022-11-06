import { ReactElement, memo, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { selectArticleDetailsCommentsIsLoading } from '../../model/selectors/selectArticleDetailsCommentsIsLoading/selectArticleDetailsCommentsIsLoading';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer } from '../../model/slice/articleDetailsCommentsSlice';

import { CommentsList } from 'entities/Comment';
import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';

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

    const isLoading = useSelector(selectArticleDetailsCommentsIsLoading);

    useDynamicModuleLoader(reducers);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchCommentsByArticleId(id));
        }
    }, [dispatch, id]);

    return (
        <div className={classNames('', {}, [className])}>
            <CommentsList comments={[]} isLoading={isLoading} />
        </div>
    );
});
