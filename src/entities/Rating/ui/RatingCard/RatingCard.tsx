import { memo, ReactElement, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, useIsDesktop } from '@/shared/lib';
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

interface RatingCardProps {
    className?: string;
    selectedStars?: number;
    text: string;
    feedbackTitle?: string;
    withFeedback?: boolean;
    onAccept?: (starsCount: number, feedbackText?: string) => void;
    onCancel?: (starsCount: number) => void;
}

export const RatingCard = memo((props: RatingCardProps): ReactElement => {
    const { t } = useTranslation();
    const isDesktop = useIsDesktop();
    const {
        className,
        text,
        selectedStars,
        onCancel,
        onAccept,
        withFeedback,
        feedbackTitle,
    } = props;

    const [starsCountSelected, setStarsCountSelected] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');

    const handleRatingSelect = useCallback(
        (starCount: number) => {
            if (!selectedStars) {
                setStarsCountSelected(starCount);
                if (withFeedback) {
                    setIsModalOpen(true);
                } else {
                    onAccept?.(starCount);
                }
            }
        },
        [onAccept, selectedStars, withFeedback],
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
            />
        </>
    );

    const renderModal = () => {
        if (isDesktop) {
            return (
                <Modal isOpen={isModalOpen} onClose={handleCancel}>
                    <VStack max gap={'16'}>
                        {modalContent}
                        <HStack max gap={'32'} justify={'end'}>
                            <Button onClick={handleAccept}>{t('Отправить')}</Button>
                            <Button
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
            <Drawer isOpen={isModalOpen} onClose={handleCancel}>
                <VStack max gap={'32'}>
                    {modalContent}
                    <Button fullWidth onClick={handleAccept}>
                        {t('Отправить')}
                    </Button>
                </VStack>
            </Drawer>
        );
    };

    return (
        <Card>
            <VStack
                max
                gap={'16'}
                className={classNames('', {}, [className])}
                align={'center'}
            >
                {text && <Text title={text} />}
                <StarRating selectedStars={selectedStars} onSelect={handleRatingSelect} />
            </VStack>
            {withFeedback && renderModal()}
        </Card>
    );
});
