import { ReactElement, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { saveJsonSettings, selectIsUserAuth, useJsonSettings } from '@/entities/User';
import { useAppDispatch, useIsDesktop } from '@/shared/lib';
import { Drawer, Modal, Text } from '@/shared/ui';

const ArticlePageGreeting = (): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isDesktop = useIsDesktop();

    const isAuth = useSelector(selectIsUserAuth);
    const { articlePageHasBeenOpen } = useJsonSettings();

    const [isOpen, setIsOpen] = useState(false);

    const onClose = (): void => setIsOpen(prev => !prev);

    useEffect(() => {
        if (isAuth && !articlePageHasBeenOpen) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ articlePageHasBeenOpen: true }));
        }
    }, [articlePageHasBeenOpen, dispatch, isAuth]);

    const content = (
        <Text
            title={t('Добро пожаловать на страницу статей!')}
            text={t('Здесь вы можете просматривать статьи и открыть любую понравившуюся')}
        />
    );

    if (isDesktop) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                {content}
            </Modal>
        );
    }

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            {content}
        </Drawer>
    );
};

export default ArticlePageGreeting;
