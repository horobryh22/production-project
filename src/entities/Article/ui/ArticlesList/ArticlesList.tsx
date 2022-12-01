import { HTMLAttributeAnchorTarget, memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { Article, ArticleView } from '../../model/types';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';

import classes from './ArticlesList.module.scss';

import { classNames } from 'shared/lib';
import { Text, TextSize } from 'shared/ui';

interface ArticlesListProps {
    className?: string;
    articles: Article[];
    view?: ArticleView;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.TILE ? 9 : 3)
        .fill(1)
        .map((item, index) => (
            <ArticleItemSkeleton className={classes.card} key={index} view={view} />
        ));

export const ArticlesList = memo((props: ArticlesListProps): ReactElement => {
    const { className, articles, view = ArticleView.TILE, isLoading, target } = props;
    const { t } = useTranslation('article');

    const renderArticle = (article: Article): ReactElement => {
        return (
            <ArticleItem
                key={article.id}
                article={article}
                view={view}
                className={classes.card}
                target={target}
            />
        );
    };

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

    return (
        <div className={classNames(classes.ArticlesList, {}, [className, classes[view]])}>
            {articles.length ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
