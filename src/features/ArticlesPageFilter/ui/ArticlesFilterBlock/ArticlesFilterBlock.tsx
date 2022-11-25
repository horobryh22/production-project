import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSearch,
    selectArticlesPageFilterSort,
} from '../../model/selectors/articlesPageFilterSelectors';
import { initArticlesPageFilter } from '../../model/services/initArticlesPageFilter/initArticlesPageFilter';
import {
    articlesPageFilterActions,
    articlesPageFilterReducer,
} from '../../model/slice/articlesPageFilterSlice';
import { ArticleSortSelector } from '../ArticleSortSelector/ArticleSortSelector';
import { ArticleTypeTabs } from '../ArticleTypeTabs/ArticleTypeTabs';

import classes from './ArticlesFilterBlock.module.scss';

import { ArticleSortType } from 'entities/Article';
import {
    classNames,
    useAppDispatch,
    useDynamicModuleLoader,
    useInitialEffect,
} from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { SortOrder } from 'shared/types';
import { Card, Input } from 'shared/ui';

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
        const { t } = useTranslation();

        const [searchParams] = useSearchParams();

        const order = useSelector(selectArticlesPageFilterOrder);
        const sort = useSelector(selectArticlesPageFilterSort);
        const search = useSelector(selectArticlesPageFilterSearch);

        useDynamicModuleLoader(reducers);

        const onChangeSort = useCallback(
            (sort: ArticleSortType): void => {
                dispatch(articlesPageFilterActions.setSort(sort));
            },
            [dispatch],
        );

        const onChangeSearch = useCallback(
            (sort: string): void => {
                dispatch(articlesPageFilterActions.setSearch(sort));
            },
            [dispatch],
        );

        const onChangeOrder = useCallback(
            (sort: SortOrder): void => {
                dispatch(articlesPageFilterActions.setOrder(sort));
            },
            [dispatch],
        );

        useInitialEffect(() => {
            dispatch(initArticlesPageFilter(searchParams));
        });

        return (
            <div className={classNames('', {}, [className])}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
                <Card className={classes.search}>
                    <Input
                        value={search}
                        onChange={onChangeSearch}
                        placeholder={t('Search', { ns: 'article' })}
                    />
                </Card>
                <ArticleTypeTabs />
            </div>
        );
    },
);
