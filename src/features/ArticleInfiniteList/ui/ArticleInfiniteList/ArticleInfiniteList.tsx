import { MutableRefObject, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { ArticlesList, ArticleView } from '@/entities/Article';
// TODO
// eslint-disable-next-line
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

import {
    selectInfiniteListIsLoading,
    selectInfiniteListLimit,
} from '../../model/selectors/articleInfiniteListSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
    useArticleInfiniteActions,
    articleInfiniteListReducer,
    infiniteListSelectors,
} from '../../model/slice/articleInfiniteListSlice';

interface ArticleInfiniteListProps {
    className?: string;
    view?: ArticleView;
    scrollPageRef?: MutableRefObject<HTMLDivElement>;
}

const reducers: ReducersList = {
    articleInfiniteList: articleInfiniteListReducer,
};

// TODO сейчас криво подгружается для больших экранов (на работе не работает триггер с плаиточным отображением)

export const ArticleInfiniteList = ({
    className,
    view,
    scrollPageRef,
}: ArticleInfiniteListProps): ReactElement => {
    const dispatch = useAppDispatch();

    const { selLimit } = useArticleInfiniteActions();

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

        selLimit(newLimit);
    }, [view, selLimit]);

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
