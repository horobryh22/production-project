import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    selectArticlePageIsLoading,
    selectArticlePageView,
} from '../model/selectors/articlePageSelectors';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import {
    articlePageActions,
    articlePageReducer,
    articleSelectors,
} from '../model/slice/articlePageSlice';

import { ArticlesList, ArticleView } from 'entities/Article';
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

    return (
        <Page onScrollEnd={onLoadNextPart} className={classNames('', {}, [className])}>
            <ViewSwitcher view={view} onChangeView={onChangeView} />
            <ArticlesList articles={articles} view={view} isLoading={isLoading} />
        </Page>
    );
});

export default ArticlesPage;
