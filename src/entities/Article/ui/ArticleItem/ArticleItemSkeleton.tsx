import { memo, ReactElement } from 'react';

import { ArticleView } from '../../model/types';

import classes from './ArticleItem.module.scss';

import { classNames } from 'shared/lib';
import { Card, Skeleton } from 'shared/ui';

interface ArticleItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleItemSkeleton = memo(
    (props: ArticleItemSkeletonProps): ReactElement => {
        const { className, view = ArticleView.TILE } = props;

        if (view === ArticleView.LIST) {
            return (
                <div
                    className={classNames(classes.ArticleItem, {}, [
                        className,
                        classes[view],
                    ])}
                >
                    {/*<Card>*/}
                    {/*    <div className={classes.header}>*/}
                    {/*        <Avatar size={30} src={article.user.avatar} />*/}
                    {/*        <Text*/}
                    {/*            text={article.user.username}*/}
                    {/*            className={classes.username}*/}
                    {/*        />*/}
                    {/*        <Text text={article.createdAt} className={classes.date} />*/}
                    {/*    </div>*/}
                    {/*    <Text title={article.title} className={classes.title} />*/}
                    {/*    <div className={classes.imageBlock}>*/}
                    {/*        <img*/}
                    {/*            src={article.img}*/}
                    {/*            alt={article.title}*/}
                    {/*            className={classes.image}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className={classes.footer}>*/}
                    {/*        <Button onClick={onOpenArticle}>*/}
                    {/*            {t('Read more', { ns: 'article' })}*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*</Card>*/}
                </div>
            );
        }

        return (
            <div
                className={classNames(classes.ArticleItem, {}, [
                    className,
                    classes[view],
                ])}
            >
                <Card>
                    <div className={classes.imageBlock}>
                        <Skeleton width={200} height={200} className={classes.image} />
                    </div>
                    <div className={classes.articleInfo}>
                        <Skeleton width={130} height={16} />
                    </div>
                    <Skeleton width={150} height={16} className={classes.title} />
                </Card>
            </div>
        );
    },
);
