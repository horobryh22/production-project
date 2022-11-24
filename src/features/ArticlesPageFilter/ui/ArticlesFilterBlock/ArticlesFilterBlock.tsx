import { memo, ReactElement, useCallback } from 'react';

import { useSelector } from 'react-redux';

import {
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSort,
} from '../../model/selectors/articlesPageFilterSelectors';
import {
    articlesPageFilterActions,
    articlesPageFilterReducer,
} from '../../model/slice/articlesPageFilterSlice';
import { ArticleSortSelector } from '../ArticleSortSelector/ArticleSortSelector';

import { ArticleSortType } from 'entities/Article';
import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';
import { SortOrder } from 'shared/types';

interface ArticlesFilterBlockProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPageFilter: articlesPageFilterReducer,
};

export const ArticlesFilterBlock = memo(
    (props: ArticlesFilterBlockProps): ReactElement => {
        const { className } = props;
        const dispatch = useAppDispatch();

        const order = useSelector(selectArticlesPageFilterOrder);
        const sort = useSelector(selectArticlesPageFilterSort);

        useDynamicModuleLoader(reducers);

        const onChangeSort = useCallback(
            (sort: ArticleSortType): void => {
                dispatch(articlesPageFilterActions.setSort(sort));
            },
            [dispatch],
        );

        const onChangeOrder = useCallback(
            (sort: SortOrder): void => {
                dispatch(articlesPageFilterActions.setOrder(sort));
            },
            [dispatch],
        );

        return (
            <div className={classNames(classes.ArticlesFilterBlock, {}, [className])}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
            </div>
        );
    },
);
