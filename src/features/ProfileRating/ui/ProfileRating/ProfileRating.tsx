import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { selectAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui';

import { useProfileRating, useRateProfile } from '../../api/profileRatingAPI';

export interface ProfileRatingProps {
    className?: string;
    profileId: string;
}

const ProfileRating = memo((props: ProfileRatingProps): ReactElement => {
    const { className, profileId } = props;
    const { t } = useTranslation();

    const authData = useSelector(selectAuthData);
    const userId = authData?.id ?? '';

    const { data, isLoading } = useProfileRating({ profileId, userId });
    // хук возвращает кортеж, в котором 1-й элемент это функция, с помощью которой отправляем данные
    // 2-й элемент это объект с настройками для мутирующего запроса
    const [rateProfileMutation, {}] = useRateProfile();

    const handleRateProfile = useCallback(
        (rating: number, feedback?: string) => {
            try {
                rateProfileMutation({
                    profileId,
                    userId,
                    rating,
                    feedback,
                });
            } catch (e) {
                console.error('Не удалось оценить профиль пользователя');
            }
        },
        [profileId, rateProfileMutation, userId],
    );

    const onAccept = useCallback(
        (rating: number, feedback: string) => {
            handleRateProfile(rating, feedback);
        },
        [handleRateProfile],
    );

    const onCancel = useCallback(
        (rating: number) => {
            handleRateProfile(rating);
        },
        [handleRateProfile],
    );

    if (isLoading) {
        return <Skeleton width={'100%'} height={108} border={'12px'} />;
    }

    const rating = data?.[0];

    return (
        <RatingCard
            data-testid={'rating'}
            className={className}
            text={t('rate_profile', { ns: 'profile' })}
            withFeedback
            feedbackTitle={t('Помогите пользователю сделать его профиль лучше')}
            rating={rating?.rating}
            onCancel={onCancel}
            onAccept={onAccept}
        />
    );
});

export default ProfileRating;
