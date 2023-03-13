import {
    memo,
    MutableRefObject,
    ReactElement,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { useSelector } from 'react-redux';

import {
    selectArticlePageInited,
    selectArticlePageIsLoading,
    selectArticlePageLimitNum,
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

import classes from './ArticlesPage.module.scss';

import { ArticlesList, ArticleView } from 'entities/Article';
import {
    ArticlesFilterBlock,
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSearch,
    selectArticlesPageFilterSort,
    selectArticlesPageFilterTypeTab,
} from 'features/ArticlesPageFilter';
import {
    classNames,
    useAppDispatch,
    useDebounce,
    useDynamicModuleLoader,
    useInitialEffect,
} from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
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

    const dispatch = useAppDispatch();

    const articles = useSelector(articleSelectors.selectAll);
    const isLoading = useSelector(selectArticlePageIsLoading);
    const view = useSelector(selectArticlePageView);
    const order = useSelector(selectArticlesPageFilterOrder);
    const sort = useSelector(selectArticlesPageFilterSort);
    const limit = useSelector(selectArticlePageLimitNum);
    const search = useSelector(selectArticlesPageFilterSearch);
    const typeTab = useSelector(selectArticlesPageFilterTypeTab);
    const _inited = useSelector(selectArticlePageInited);
    const debouncedSearch = useDebounce<string>(search);

    const [scrollPageRef, setScrollPageRef] = useState<
        MutableRefObject<HTMLDivElement> | undefined
    >(undefined);

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
        if (_inited) {
            dispatch(fetchArticlesList({ page: 1, replace: true }));
        }
    }, [dispatch, order, sort, debouncedSearch, _inited, typeTab, limit]);

    return (
        <Page
            onScrollEnd={onLoadNextPart}
            setScrollPageRef={setScrollPageRef}
            className={classNames('', {}, [className])}
        >
            <ViewSwitcher view={view} onChangeView={onChangeView} />
            <ArticlesFilterBlock />
            <ArticlesList
                className={classes.articlesList}
                articles={articles}
                view={view}
                isLoading={isLoading}
                scrollPageRef={scrollPageRef}
                needVirtualization
            />
        </Page>
    );
});

export default ArticlesPage;
