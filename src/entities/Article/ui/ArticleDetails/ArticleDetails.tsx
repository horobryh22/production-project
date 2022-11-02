import { memo, ReactElement, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    selectArticleDetailsError,
    selectArticleDetailsIsLoading,
} from '../../model/selectors';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import classes from './ArticleDetails.module.scss';

import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';
import { Skeleton, Text } from 'shared/ui';
import { TextAlign, TextTheme } from 'shared/ui/Text/Text';

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
    // const article = useSelector(selectArticleDetailsData);
    const isLoading = useSelector(selectArticleDetailsIsLoading);
    const error = useSelector(selectArticleDetailsError);

    useDynamicModuleLoader(reducers);

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);

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

    return <div className={classNames(classes.ArticleDetails, {}, [className])}></div>;
});
