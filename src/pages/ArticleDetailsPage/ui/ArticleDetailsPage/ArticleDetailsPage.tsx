import { lazy, memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetails, useArticleDetailsIsLoading } from '@/entities/Article';
import { classNames } from '@/shared/lib';
import { Text, VStack, LazyLoader, TextTheme } from '@/shared/ui';
import { Page } from '@/widgets/Page';

import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';

// lazy loading
const ArticleRating = lazy(() => import('@/features/ArticleRating'));
const ArticleComments = lazy(() => import('@/features/ArticleComments'));
const ArticleRecommendationsList = lazy(
    () => import('@/features/ArticleRecommendationsList'),
);

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps): ReactElement => {
    const { className } = props;
    const { t } = useTranslation('article');

    let { id } = useParams();

    // если контент еще загружается, скипаем подгрузку чанков, которые находятся ниже
    const isMainContentLoading = useArticleDetailsIsLoading();

    if (!id && __PROJECT__ === 'storybook') id = '1';

    if (!id) {
        return (
            <Page className={classNames('', {}, [className])}>
                <Text
                    theme={TextTheme.ERROR}
                    text={t('Article not found', { ns: 'article' })}
                />
            </Page>
        );
    }

    return (
        <Page
            data-testid={'ArticleDetailsPage'}
            className={classNames('', {}, [className])}
        >
            <VStack gap={'16'} max>
                <ArticleDetailsHeader />
                <ArticleDetails id={id} />
                <LazyLoader
                    skip={isMainContentLoading}
                    initialInView={__PROJECT__ === 'storybook'}
                >
                    <ArticleRating articleId={id} />
                </LazyLoader>
                <LazyLoader
                    skip={isMainContentLoading}
                    initialInView={__PROJECT__ === 'storybook'}
                >
                    <ArticleRecommendationsList />
                </LazyLoader>
                <LazyLoader
                    skip={isMainContentLoading}
                    initialInView={__PROJECT__ === 'storybook'}
                >
                    <ArticleComments id={id} />
                </LazyLoader>
            </VStack>
        </Page>
    );
});

export default ArticleDetailsPage;
