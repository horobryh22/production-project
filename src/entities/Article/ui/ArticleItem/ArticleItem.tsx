import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

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
import { Avatar, Button, Card, Icon, Text } from 'shared/ui';

interface ArticleItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
}

export const ArticleItem = memo((props: ArticleItemProps): ReactElement => {
    const { className, view = ArticleView.TILE, article } = props;

    const { t } = useTranslation('article');

    const navigate = useNavigate();

    const [hover, bindHover] = useHover();

    const types = <Text text={article.type.join(', ')} className={classes.tags} />;
    const views = (
        <>
            <Text text={String(article.views)} className={classes.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.articles_details + article.id);
    }, [article.id, navigate]);

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
                        <Button onClick={onOpenArticle}>
                            {t('Read more', { ns: 'article' })}
                        </Button>
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
        <div
            {...bindHover}
            className={classNames(classes.ArticleItem, mods, [className, classes[view]])}
        >
            <Card onClick={onOpenArticle}>
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
        </div>
    );
});
