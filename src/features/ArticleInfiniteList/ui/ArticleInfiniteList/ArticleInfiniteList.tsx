import { MutableRefObject, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import {
    selectInfiniteListIsLoading,
    selectInfiniteListLimit,
} from '../../model/selectors/articleInfiniteListSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
    articleInfiniteListActions,
    articleInfiniteListReducer,
    infiniteListSelectors,
} from '../../model/slice/articleInfiniteListSlice';

import { ArticlesList, ArticleView } from '@/entities/Article';
import {
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSearch,
    selectArticlesPageFilterSort,
    selectArticlesPageFilterTypeTab,
} from '@/features/ArticlesPageFilter';
import {
    classNames,
    useAppDispatch,
    useDebounce,
    useDynamicModuleLoader,
    useInitialEffect,
} from '@/shared/lib';
import { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';

interface ArticleInfiniteListProps {
    className?: string;
    view?: ArticleView;
    scrollPageRef?: MutableRefObject<HTMLDivElement>;
}

const reducers: ReducersList = {
    articleInfiniteList: articleInfiniteListReducer,
};

export const ArticleInfiniteList = ({
    className,
    view,
    scrollPageRef,
}: ArticleInfiniteListProps): ReactElement => {
    const dispatch = useAppDispatch();

    const needVirtualization = __PROJECT__ !== 'storybook';

    const articles = useSelector(infiniteListSelectors.selectAll);
    const isLoading = useSelector(selectInfiniteListIsLoading);
    const order = useSelector(selectArticlesPageFilterOrder);
    const sort = useSelector(selectArticlesPageFilterSort);
    const search = useSelector(selectArticlesPageFilterSearch);
    const typeTab = useSelector(selectArticlesPageFilterTypeTab);
    const limit = useSelector(selectInfiniteListLimit);
    const debouncedSearch = useDebounce<string>(search);

    useDynamicModuleLoader(reducers, false);

    useInitialEffect(() => {
        const newLimit = view === ArticleView.TILE ? 8 : 3;

        dispatch(articleInfiniteListActions.selLimit(newLimit));
    }, [dispatch, view]);

    useInitialEffect(() => {
        dispatch(fetchArticlesList({ page: 1, replace: true }));
    }, [dispatch, order, sort, debouncedSearch, typeTab, view, limit]);

    return (
        <ArticlesList
            className={classNames('', {}, [className])}
            articles={articles}
            view={view}
            isLoading={isLoading}
            scrollPageRef={scrollPageRef}
            needVirtualization={needVirtualization}
        />
    );
};
