import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';

import { ArticleDetails } from '@/entities/Article';
import { ArticleComments } from '@/features/ArticleComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { classNames } from '@/shared/lib';
import { Text, VStack } from '@/shared/ui';
import { TextTheme } from '@/shared/ui/Text/Text';
import { Page } from '@/widgets/Page';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps): ReactElement => {
    const { className } = props;
    const { t } = useTranslation('article');

    let { id } = useParams();

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
        <Page className={classNames('', {}, [className])}>
            <VStack gap={'16'} max>
                <ArticleDetailsHeader />
                <ArticleDetails id={id} />
                <ArticleRating articleId={id} />
                <ArticleRecommendationsList />
                <ArticleComments id={id} />
            </VStack>
        </Page>
    );
});

export default ArticleDetailsPage;
