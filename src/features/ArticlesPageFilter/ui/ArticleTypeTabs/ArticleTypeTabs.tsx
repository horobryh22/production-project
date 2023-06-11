import { memo, ReactElement, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectArticlesPageFilterTypeTab } from '../../model/selectors/articlesPageFilterSelectors';
import { articlesPageFilterActions } from '../../model/slice/articlesPageFilterSlice';

import classes from './ArticleTypeTabs.module.scss';

import { ArticleType } from '@/entities/Article';
import { classNames, useAppDispatch } from '@/shared/lib';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';

interface ArticleTypeTabsProps {
    className?: string;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps): ReactElement => {
    const { className } = props;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const typeTab = useSelector(selectArticlesPageFilterTypeTab);

    const typeTabs = useMemo<TabItem[]>(() => {
        return [
            {
                value: ArticleType.ALL,
                content: t('All', { ns: 'article' }),
            },
            {
                value: ArticleType.IT,
                content: t('IT', { ns: 'article' }),
            },
            {
                value: ArticleType.SCIENCE,
                content: t('Science', { ns: 'article' }),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t('Economics', { ns: 'article' }),
            },
        ];
    }, [t]);

    const onChangeTypeTab = useCallback(
        (tab: TabItem): void => {
            dispatch(articlesPageFilterActions.setTypeTab(tab.value));
        },
        [dispatch],
    );

    return (
        <Tabs
            onTabClick={onChangeTypeTab}
            tabs={typeTabs}
            value={typeTab}
            className={classNames(classes.ArticleTypeTabs, {}, [className])}
        />
    );
});
