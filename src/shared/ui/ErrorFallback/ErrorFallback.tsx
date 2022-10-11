import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '../../lib';
import { Button, ThemeButton } from '../Button/Button';

import classes from './ErrorFallback.module.scss';

interface FallbackProps {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps): ReactElement => {
    const { t } = useTranslation();

    return (
        <div className={classNames(classes.wrapper)}>
            <p>{t('Something went wrong')}</p>
            <Button onClick={resetErrorBoundary} theme={ThemeButton.OUTLINE}>
                {t('Reload page')}
            </Button>
        </div>
    );
};
