import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import DataIcon from '@/shared/assets/icons/date.svg';
import ViewIcon from '@/shared/assets/icons/view.svg';
import {
    useInitialEffect,
    classNames,
    useAppDispatch,
    useDynamicModuleLoader,
} from '@/shared/lib';
import { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import {
    Avatar,
    Icon,
    Skeleton,
    Text,
    TextAlign,
    TextSize,
    TextTheme,
} from '@/shared/ui';

import { ArticleBlockType } from '../../model/consts/consts';
import {
    useArticleDetailsData,
    useArticleDetailsError,
    useArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock } from '../../model/types';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import classes from './ArticleDetails.module.scss';

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps): ReactElement => {
    const { className, id } = props;
    const { t } = useTranslation('article');

    const dispatch = useAppDispatch();
    const article = useArticleDetailsData();
    const isLoading = useArticleDetailsIsLoading();
    const error = useArticleDetailsError();

    useDynamicModuleLoader(reducers);

    useInitialEffect(() => dispatch(fetchArticleById(id)), []);

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
