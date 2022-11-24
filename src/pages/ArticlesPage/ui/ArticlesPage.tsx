import { memo, ReactElement, useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    selectArticlePageIsLoading,
    selectArticlePageView,
} from '../model/selectors/articlePageSelectors';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import {
    articlePageActions,
    articlePageReducer,
    articleSelectors,
} from '../model/slice/articlePageSlice';

import { ArticlesList, ArticleView } from 'entities/Article';
import {
    ArticlesFilterBlock,
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSort,
} from 'features/ArticlesPageFilter';
import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Page } from 'widgets/Page';
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
    const order = useSelector(selectArticlesPageFilterOrder);
    const sort = useSelector(selectArticlesPageFilterSort);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlePageActions.setView(view));
        },
        [dispatch],
    );

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useDynamicModuleLoader(reducers, false);

    useInitialEffect(() => {
        dispatch(initArticlesPage());
    });

    useEffect(() => {
        dispatch(fetchArticlesList({ page: 1, replace: true }));
    }, [dispatch, order, sort]);

    return (
        <Page onScrollEnd={onLoadNextPart} className={classNames('', {}, [className])}>
            <ViewSwitcher view={view} onChangeView={onChangeView} />
            <ArticlesFilterBlock />
            <ArticlesList articles={articles} view={view} isLoading={isLoading} />
        </Page>
    );
});

export default ArticlesPage;
