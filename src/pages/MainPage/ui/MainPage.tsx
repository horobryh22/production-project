import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page';

const MainPage = (): ReactElement => {
    const { t } = useTranslation('main');

    return (
        <Page>
            {t('Main page', { ns: 'main' })}
            <RatingCard
                onAccept={(starsCount, feedbackText) =>
                    console.log(
                        `Данные в базе обновлены, рейтинг - ${starsCount}, отзыв - ${feedbackText}`,
                    )
                }
                onCancel={starsCount =>
                    console.log(`Данные в базе обновлены, рейтинг - ${starsCount}`)
                }
                text={'Оцените статью'}
                withFeedback
                feedbackTitle={'Помогите нам сделать продукт лучше'}
            />
        </Page>
    );
};

export default MainPage;
