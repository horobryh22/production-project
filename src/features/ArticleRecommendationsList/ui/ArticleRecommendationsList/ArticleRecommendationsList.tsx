import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectArticleRecommendationsIsLoading } from '../../model/selectors/articleRecommendationsSelectors';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import {
    articleRecommendationsReducer,
    articleRecommendationsSelectors,
} from '../../model/slices/articleRecommendationsSlice';

import classes from './ArticleRecommendationsList.module.scss';

import { ArticlesList, ArticleView } from 'entities/Article';
import {
    classNames,
    useAppDispatch,
    useDynamicModuleLoader,
    useInitialEffect,
} from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Text, TextSize } from 'shared/ui';

interface ArticleRecommendationsListProps {
    className?: string;
}

const reducers: ReducersList = {
    articleRecommendations: articleRecommendationsReducer,
};

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps): ReactElement => {
        const { className } = props;
        const { t } = useTranslation('article');

        const dispatch = useAppDispatch();

        const recommendations = useSelector(articleRecommendationsSelectors.selectAll);
        const isLoading = useSelector(selectArticleRecommendationsIsLoading);

        useDynamicModuleLoader(reducers);

        useInitialEffect(() => {
            dispatch(fetchArticleRecommendations());
        });

        return (
            <div
                className={classNames(classes.ArticleRecommendationsList, {}, [
                    className,
                ])}
            >
                <Text
                    size={TextSize.L}
                    title={t('Recommended articles', { ns: 'article' })}
                />
                <ArticlesList
                    className={classes.recommendationsList}
                    articles={recommendations}
                    isLoading={isLoading}
                    view={ArticleView.TILE}
                    target={'_blank'}
                />
            </div>
        );
    },
);
