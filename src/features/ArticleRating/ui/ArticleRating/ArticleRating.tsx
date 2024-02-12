import { ReactElement, memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { selectAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui';

import { useArticleRating, useRateArticle } from '../../api/articleRatingAPI';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps): ReactElement => {
    const { className, articleId } = props;
    const { t } = useTranslation();

    const authData = useSelector(selectAuthData);
    const userId = authData?.id ?? '';

    const { data, isLoading } = useArticleRating({ articleId, userId });
    const [rateArticleMutation, {}] = useRateArticle();

    const handleRateArticle = useCallback(
        (rating: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    articleId,
                    userId,
                    rating,
                    feedback,
                });
            } catch (e) {
                console.error('Не удалось оценить статью');
            }
        },
        [articleId, rateArticleMutation, userId],
    );

    const onAccept = useCallback(
        (rating: number, feedback: string) => {
            handleRateArticle(rating, feedback);
        },
        [handleRateArticle],
    );

    const onCancel = useCallback(
        (rating: number) => {
            handleRateArticle(rating);
        },
        [handleRateArticle],
    );

    if (isLoading) {
        return <Skeleton width={'100%'} height={108} border={'12px'} />;
    }

    const rating = data?.[0];

    return (
        <RatingCard
            className={className}
            text={t('Оцените статью')}
            withFeedback
            feedbackTitle={t('Помогите нам сделать продукт лучше')}
            rating={rating?.rating}
            onCancel={onCancel}
            onAccept={onAccept}
        />
    );
});

export default ArticleRating;
