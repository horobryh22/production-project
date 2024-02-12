import { ReactElement, memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleSortType } from '@/entities/Article';
import { classNames } from '@/shared/lib';
import { SortOrder } from '@/shared/types';
import { Select, SelectOptions } from '@/shared/ui';

import classes from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortType;
    order: SortOrder;
    onChangeSort: (newSort: ArticleSortType) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = memo(
    (props: ArticleSortSelectorProps): ReactElement => {
        const { className, onChangeSort, sort, onChangeOrder, order } = props;
        const { t } = useTranslation();

        const sortFields: SelectOptions<ArticleSortType>[] = useMemo(() => {
            return [
                {
                    value: ArticleSortType.CREATED,
                    content: t('created', { ns: 'article' }),
                },
                {
                    value: ArticleSortType.VIEWS,
                    content: t('views', { ns: 'article' }),
                },
                {
                    value: ArticleSortType.TITLE,
                    content: t('title', { ns: 'article' }),
                },
            ];
        }, [t]);

        const orderFields: SelectOptions<SortOrder>[] = useMemo(() => {
            return [
                {
                    value: SortOrder.DESC,
                    content: t('Descending', { ns: 'article' }),
                },
                {
                    value: SortOrder.ASC,
                    content: t('Ascending', { ns: 'article' }),
                },
            ];
        }, [t]);

        return (
            <div className={classNames(classes.ArticleSortSelector, {}, [className])}>
                <Select<ArticleSortType>
                    value={sort}
                    label={t('Sort by', { ns: 'article' })}
                    options={sortFields}
                    onChange={onChangeSort}
                    className={classes.select}
                />
                <Select<SortOrder>
                    value={order}
                    label={t('direction', { ns: 'article' })}
                    options={orderFields}
                    onChange={onChangeOrder}
                />
            </div>
        );
    },
);
