import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSort,
} from '../../model/selectors/articlesPageFilterSelectors';
import { initArticlesPageFilter } from '../../model/services/initArticlesPageFilter/initArticlesPageFilter';
import {
    articlesPageFilterActions,
    articlesPageFilterReducer,
} from '../../model/slice/articlesPageFilterSlice';
import { ArticleSortSelector } from '../ArticleSortSelector/ArticleSortSelector';

import classes from './ArticlesFilterBlock.module.scss';

import { ArticleSortType } from 'entities/Article';
import { ArticleTypeTabs } from 'features/ArticlesPageFilter/ui/ArticleTypeTabs/ArticleTypeTabs';
import {
    classNames,
    useAppDispatch,
    useDebounce,
    useDynamicModuleLoader,
} from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
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

        useDynamicModuleLoader(reducers);

        const onChangeSort = useCallback(
            (sort: ArticleSortType): void => {
                dispatch(articlesPageFilterActions.setSort(sort));
            },
            [dispatch],
        );

        const onChangeSearch = useDebounce((sort: string): void => {
            dispatch(articlesPageFilterActions.setSearch(sort));
        }, 500);

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
                        onChange={onChangeSearch}
                        placeholder={t('Search', { ns: 'article' })}
                    />
                </Card>
                <ArticleTypeTabs />
            </div>
        );
    },
);
