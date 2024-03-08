import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    classNames,
    useAppDispatch,
    useDynamicModuleLoader,
    useInitialEffect,
} from '@/shared/lib';
import { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Card, Input } from '@/shared/ui';

import {
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSearch,
    selectArticlesPageFilterSort,
} from '../../model/selectors/articlesPageFilterSelectors';
import { initArticlesPageFilter } from '../../model/services/initArticlesPageFilter/initArticlesPageFilter';
import {
    useArticlePageFilterActions,
    articlesPageFilterReducer,
} from '../../model/slice/articlesPageFilterSlice';
import { ArticleSortSelector } from '../ArticleSortSelector/ArticleSortSelector';
import { ArticleTypeTabs } from '../ArticleTypeTabs/ArticleTypeTabs';

import classes from './ArticlesFilterBlock.module.scss';

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
        const { setOrder, setSort, setSearch } = useArticlePageFilterActions();

        const [searchParams] = useSearchParams();

        const order = useSelector(selectArticlesPageFilterOrder);
        const sort = useSelector(selectArticlesPageFilterSort);
        const search = useSelector(selectArticlesPageFilterSearch);

        useDynamicModuleLoader(reducers);

        useInitialEffect(() => {
            dispatch(initArticlesPageFilter(searchParams));
        }, []);

        return (
            <div className={classNames('', {}, [className])}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeSort={setSort}
                    onChangeOrder={setOrder}
                />
                <Card className={classes.search}>
                    <Input
                        value={search}
                        onChange={setSearch}
                        placeholder={t('Search', { ns: 'article' })}
                        data-testid={'ArticleFilterBlock.Input'}
                    />
                </Card>
                <ArticleTypeTabs />
            </div>
        );
    },
);
