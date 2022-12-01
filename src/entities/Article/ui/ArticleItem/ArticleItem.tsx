import { HTMLAttributeAnchorTarget, memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleView,
} from '../../model/types';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import classes from './ArticleItem.module.scss';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import EyeIcon from 'shared/assets/icons/view.svg';
import { classNames, useHover } from 'shared/lib';
import { Mods } from 'shared/lib/classNames/classNames';
import { AppLink, Avatar, Button, Card, Icon, Text } from 'shared/ui';

interface ArticleItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleItem = memo((props: ArticleItemProps): ReactElement => {
    const { className, view = ArticleView.TILE, article, target } = props;

    const { t } = useTranslation('article');

    const [hover, bindHover] = useHover();

    const types = <Text text={article.type.join(', ')} className={classes.tags} />;
    const views = (
        <>
            <Text text={String(article.views)} className={classes.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            article => article.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div
                className={classNames(classes.ArticleItem, {}, [
                    className,
                    classes[view],
                ])}
            >
                <Card>
                    <div className={classes.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={classes.username} />
                        <Text text={article.createdAt} className={classes.date} />
                    </div>
                    <Text title={article.title} className={classes.title} />
                    {types}
                    <div className={classes.imageBlock}>
                        <img
                            src={article.img}
                            alt={article.title}
                            className={classes.image}
                        />
                    </div>
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={classes.textBlock}
                        />
                    )}
                    <div className={classes.footer}>
                        <AppLink to={RoutePath.articles_details + article.id}>
                            <Button>{t('Read more', { ns: 'article' })}</Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    const mods: Mods = {
        [classes.hover]: hover,
    };

    return (
        <AppLink
            {...bindHover}
            to={RoutePath.articles_details + article.id}
            target={target}
            className={classNames(classes.ArticleItem, mods, [className, classes[view]])}
        >
            <Card>
                <div className={classes.imageBlock}>
                    <img
                        src={article.img}
                        alt={article.title}
                        className={classes.image}
                    />
                    <Text text={article.createdAt} className={classes.date} />
                </div>
                <div className={classes.articleInfo}>
                    {types}
                    {views}
                </div>
                <Text title={article.title} className={classes.title} />
            </Card>
        </AppLink>
    );
});
