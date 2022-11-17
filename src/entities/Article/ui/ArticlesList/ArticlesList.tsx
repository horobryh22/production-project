import { memo, ReactElement } from 'react';

import { Article, ArticleView } from '../../model/types';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';

import classes from './ArticlesList.module.scss';

import { classNames } from 'shared/lib';

interface ArticlesListProps {
    className?: string;
    articles: Article[];
    view?: ArticleView;
    isLoading?: boolean;
}

export const ArticlesList = memo((props: ArticlesListProps): ReactElement => {
    const { className, articles, view = ArticleView.TILE, isLoading } = props;

    if (isLoading) {
        return (
            <div
                className={classNames(classes.ArticlesList, {}, [
                    className,
                    classes[view],
                ])}
            >
                {new Array(view === ArticleView.TILE ? 9 : 3)
                    .fill(1)
                    .map((item, index) => (
                        <ArticleItemSkeleton
                            className={classes.card}
                            key={index}
                            view={view}
                        />
                    ))}
            </div>
        );
    }

    const renderArticle = (article: Article): ReactElement => {
        return (
            <ArticleItem
                key={article.id}
                article={article}
                view={view}
                className={classes.card}
            />
        );
    };

    return (
        <div className={classNames(classes.ArticlesList, {}, [className, classes[view]])}>
            {articles.length ? articles.map(renderArticle) : null}
        </div>
    );
});
