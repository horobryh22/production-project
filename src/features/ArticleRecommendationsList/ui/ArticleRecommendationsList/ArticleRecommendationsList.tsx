import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticlesList, ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib';
import { Text, TextSize, VStack } from '@/shared/ui';

import { useRecommendedArticles } from '../../api/recommendedArticlesAPI';

import classes from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
    className?: string;
}

const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps): ReactElement => {
        const { className } = props;
        const { t } = useTranslation('article');

        const { data: recommendedArticles, isLoading } = useRecommendedArticles(6);

        if (!recommendedArticles && !isLoading) {
            return <Text text={t('Рекоммендованные статьи не были найдены')} />;
        }

        return (
            <VStack
                data-testid={'ArticleRecommendationsList'}
                max
                gap={'16'}
                className={classNames('', {}, [className])}
            >
                <Text
                    size={TextSize.L}
                    title={t('Recommended articles', { ns: 'article' })}
                />
                <ArticlesList
                    className={classes.recommendationsList}
                    articles={recommendedArticles ?? []}
                    isLoading={isLoading}
                    view={ArticleView.TILE}
                    target={'_blank'}
                />
            </VStack>
        );
    },
);

export default ArticleRecommendationsList;
