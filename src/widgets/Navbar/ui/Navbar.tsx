import React, { ReactElement, useState } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './Navbar.module.scss';

import { classNames } from 'shared/lib';
import { Button, ButtonTheme, Modal } from 'shared/ui';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps): ReactElement => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);

    const onToggleModal = (): void => {
        if (isOpen) {
            setIsOpen(prev => !prev);

            return;
        }

        setIsOpen(prev => !prev);
    };

    return (
        <div className={classNames(classes.Navbar, {}, [String(className)])}>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Modal isOpen={isOpen} onClose={onToggleModal}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at
                consectetur delectus, facilis, fugiat inventore magnam, omnis quae sed
                similique sint tempora temporibus tenetur unde voluptatem. Assumenda cum
                laborum vitae.
            </Modal>
            <Button
                className={classes.links}
                onClick={onToggleModal}
                theme={ButtonTheme.CLEAR_INVERTED}
            >
                {t('Login')}
            </Button>
        </div>
    );
};
