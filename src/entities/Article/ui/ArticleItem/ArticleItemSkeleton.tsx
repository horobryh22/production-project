import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib';
import { Card, Skeleton } from '@/shared/ui';

import { ArticleView } from '../../model/consts/consts';

import classes from './ArticleItem.module.scss';

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
                    <Card>
                        <div className={classes.header}>
                            <Skeleton width={30} height={30} border="100%" />
                            <Skeleton
                                width={150}
                                height={16}
                                className={classes.username}
                            />
                            <Skeleton width={110} height={16} className={classes.date} />
                        </div>
                        <Skeleton width={500} height={25} className={classes.title} />
                        <Skeleton width={50} height={16} className={classes.tags} />
                        <div className={classes.imageBlock}>
                            <Skeleton
                                width="100%"
                                height={200}
                                className={classes.image}
                            />
                        </div>
                        <Skeleton
                            width="100%"
                            height={80}
                            className={classes.textBlock}
                        />
                        <div className={classes.footer}>
                            <Skeleton width={100} height={32} className={classes.image} />
                        </div>
                    </Card>
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
