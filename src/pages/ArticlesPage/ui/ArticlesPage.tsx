import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    selectArticlePageIsLoading,
    selectArticlePagePageNum,
    selectArticlePageView,
} from '../model/selectors/articlePageSelectors';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
    articlePageActions,
    articlePageReducer,
    articleSelectors,
} from '../model/slice/articlePageSlice';

import classes from './ArticlesPage.module.scss';

import { ArticlesList, ArticleView } from 'entities/Article';
import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Page } from 'shared/ui';
import { ViewSwitcher } from 'widgets/ViewSwitcher';

interface ArticlePageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlePage: articlePageReducer,
};

const ArticlesPage = memo((props: ArticlePageProps): ReactElement => {
    const { className } = props;

    const {} = useTranslation('article');

    const dispatch = useAppDispatch();

    const articles = useSelector(articleSelectors.selectAll);
    const isLoading = useSelector(selectArticlePageIsLoading);
    const view = useSelector(selectArticlePageView);
    const page = useSelector(selectArticlePagePageNum);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlePageActions.setView(view));
        },
        [dispatch],
    );

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useDynamicModuleLoader(reducers);

    useInitialEffect(() => {
        dispatch(articlePageActions.initState());
        dispatch(fetchArticlesList({ page }));
    });

    return (
        <Page
            onScrollEnd={onLoadNextPart}
            className={classNames(classes.ArticlePage, {}, [className])}
        >
            <ViewSwitcher view={view} onChangeView={onChangeView} />
            <ArticlesList articles={articles} view={view} isLoading={isLoading} />
        </Page>
    );
});

export default ArticlesPage;
