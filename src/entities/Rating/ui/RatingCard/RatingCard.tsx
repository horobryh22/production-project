import { memo, ReactElement, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, useIsDesktop } from '@/shared/lib';
import type { TestProps } from '@/shared/types/testData';
import {
    Button,
    ButtonTheme,
    Card,
    Drawer,
    HStack,
    Input,
    Modal,
    StarRating,
    Text,
    VStack,
} from '@/shared/ui';

interface RatingCardProps extends TestProps {
    className?: string;
    rating?: number;
    text: string;
    feedbackTitle?: string;
    withFeedback?: boolean;
    onAccept?: (starsCount: number, feedbackText: string) => void;
    onCancel?: (starsCount: number) => void;
}

export const RatingCard = memo((props: RatingCardProps): ReactElement => {
    const { t } = useTranslation();
    const isDesktop = useIsDesktop();
    const {
        className,
        text,
        rating = 0,
        onCancel,
        onAccept,
        withFeedback,
        feedbackTitle,
    } = props;

    const [starsCountSelected, setStarsCountSelected] = useState(rating);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');

    const handleRatingSelect = useCallback(
        (starCount: number) => {
            if (!rating) {
                setStarsCountSelected(starCount);
                if (withFeedback) {
                    setIsModalOpen(true);
                } else {
                    onCancel?.(starCount);
                }
            }
        },
        [onCancel, rating, withFeedback],
    );

    const handleCancel = useCallback(() => {
        onCancel?.(starsCountSelected);
        setIsModalOpen(false);
    }, [onCancel, starsCountSelected]);

    const handleAccept = useCallback(() => {
        onAccept?.(starsCountSelected, feedbackText);
        setIsModalOpen(false);
    }, [feedbackText, onAccept, starsCountSelected]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                autoFocus
                value={feedbackText}
                onChange={setFeedbackText}
                placeholder={t('Введите отзыв')}
                data-testid={'RatingCard.Input'}
            />
        </>
    );

    const renderModal = () => {
        if (isDesktop) {
            return (
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCancel}
                    testMode={__PROJECT__ === 'storybook'}
                    data-testid={'RatingCard.Modal'}
                >
                    <VStack max gap={'16'}>
                        {modalContent}
                        <HStack max gap={'32'} justify={'end'}>
                            <Button
                                data-testid={'RatingCard.Send'}
                                onClick={handleAccept}
                            >
                                {t('Отправить')}
                            </Button>
                            <Button
                                data-testid={'RatingCard.Cancel'}
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={handleCancel}
                            >
                                {t('Отмена')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            );
        }

        return (
            <Drawer
                isOpen={isModalOpen}
                onClose={handleCancel}
                testMode={__PROJECT__ === 'storybook'}
                data-testid={'RatingCard.Drawer'}
            >
                <VStack max gap={'32'}>
                    {modalContent}
                    <Button
                        fullWidth
                        onClick={handleAccept}
                        data-testid={'RatingCard.Send'}
                    >
                        {t('Отправить')}
                    </Button>
                </VStack>
            </Drawer>
        );
    };

    return (
        <Card max data-testid={'RatingCard'}>
            <VStack
                max
                gap={'16'}
                className={classNames('', {}, [className])}
                align={'center'}
            >
                {text && <Text title={rating ? t('thanks_for_your_grade') : text} />}
                <StarRating selectedStars={rating} onSelect={handleRatingSelect} />
            </VStack>
            {withFeedback && renderModal()}
        </Card>
    );
});
