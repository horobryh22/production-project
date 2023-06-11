import { HTMLAttributeAnchorTarget, memo, MutableRefObject, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';

import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';

import classes from './ArticlesList.module.scss';

import { classNames } from '@/shared/lib';
import { Text, TextSize } from '@/shared/ui';

interface ArticlesListProps {
    className?: string;
    articles: Article[];
    view?: ArticleView;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    scrollPageRef?: MutableRefObject<HTMLDivElement>;
    needVirtualization?: boolean;
}

const getSkeletons = (view: ArticleView): ReactElement[] =>
    new Array(view === ArticleView.TILE ? 8 : 3)
        .fill(1)
        .map((item, index) => (
            <ArticleItemSkeleton key={index} className={classes.card} view={view} />
        ));

export const ArticlesList = memo((props: ArticlesListProps): ReactElement => {
    const {
        className,
        articles,
        view = ArticleView.TILE,
        isLoading,
        target,
        scrollPageRef,
        needVirtualization,
    } = props;
    const { t } = useTranslation('article');

    const isFirstRender = articles.length === 0;

    const renderArticle = (article: Article): ReactElement => {
        return (
            <ArticleItem
                key={article.id}
                className={needVirtualization ? classes.card : ''}
                article={article}
                view={view}
                target={target}
            />
        );
    };

    const skeletons = isLoading && getSkeletons(view);

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(classes.ArticlesList, {}, [
                    className,
                    classes[view],
                ])}
            >
                <Text
                    title={t('Articles not found', { ns: 'article' })}
                    size={TextSize.L}
                />
            </div>
        );
    }

    return needVirtualization ? (
        <>
            <VirtuosoGrid
                listClassName={classNames('', {}, [className, classes[view]])}
                itemClassName={classes.card}
                totalCount={articles.length}
                customScrollParent={scrollPageRef?.current}
                itemContent={index => {
                    return articles.map(renderArticle)[index];
                }}
            />
            <div
                className={classNames(
                    classes.skeletons,
                    { [classes.loading]: !isFirstRender && isLoading },
                    [classes[view]],
                )}
            >
                {skeletons}
            </div>
        </>
    ) : (
        <div className={classNames(classes.ArticlesList, {}, [className, classes[view]])}>
            {articles.length ? articles.map(renderArticle) : null}
            {skeletons}
        </div>
    );
});
