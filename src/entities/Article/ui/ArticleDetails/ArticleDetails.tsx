import { memo, ReactElement, useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    selectArticleDetailsData,
    selectArticleDetailsError,
    selectArticleDetailsIsLoading,
} from '../../model/selectors';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from '../../model/types';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import classes from './ArticleDetails.module.scss';

import DataIcon from 'shared/assets/icons/date.svg';
import ViewIcon from 'shared/assets/icons/view.svg';
import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';
import { Avatar, Icon, Skeleton, Text } from 'shared/ui';
import { TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps): ReactElement => {
    const { className, id } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const article = useSelector(selectArticleDetailsData);
    const isLoading = useSelector(selectArticleDetailsIsLoading);
    const error = useSelector(selectArticleDetailsError);

    useDynamicModuleLoader(reducers);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.TEXT:
                return (
                    <ArticleTextBlockComponent
                        key={block.id}
                        className={classes.block}
                        block={block}
                    />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlockComponent
                        key={block.id}
                        className={classes.block}
                        block={block}
                    />
                );
            case ArticleBlockType.CODE:
                return (
                    <ArticleCodeBlockComponent
                        key={block.id}
                        className={classes.block}
                        block={block}
                    />
                );
            default:
                return null;
        }
    }, []);

    if (isLoading) {
        return (
            <div className={classNames(classes.ArticleDetails, {}, [className])}>
                <Skeleton
                    className={classes.avatar}
                    height={200}
                    width={200}
                    border="50%"
                />
                <Skeleton className={classes.title} height={32} width={300} />
                <Skeleton className={classes.skeleton} height={24} width={600} />
                <Skeleton className={classes.skeleton} height={200} width="100%" />
                <Skeleton className={classes.skeleton} height={200} width="100%" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(classes.ArticleDetails, {}, [className])}>
                <Text
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                    title={t('Article was not received', { ns: 'article' })}
                />
            </div>
        );
    }

    return (
        <div className={classNames(classes.ArticleDetails, {}, [className])}>
            <div className={classes.avatarWrapper}>
                <Avatar src={article?.img} size={200} />
            </div>
            <Text
                className={classes.title}
                text={article?.subtitle}
                title={article?.title}
                size={TextSize.L}
            />
            <div className={classes.articleInfo}>
                <Icon Svg={ViewIcon} />
                <Text text={String(article?.views)} />
            </div>
            <div className={classes.articleInfo}>
                <Icon Svg={DataIcon} />
                <Text text={article?.createdAt} />
            </div>
            {article?.blocks.map(renderBlock)}
        </div>
    );
});
