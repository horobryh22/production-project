import { ReactElement, useState } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './LoginForm.module.scss';

import { classNames } from 'shared/lib';
import { Button, ButtonTheme, Input } from 'shared/ui';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps): ReactElement => {
    const { t } = useTranslation();

    const [value, setValue] = useState('');

    return (
        <div className={classNames(classes.LoginForm, {}, [className])}>
            <Input
                autoFocus
                className={classes.input}
                value={value}
                onChange={setValue}
                placeholder={t('Enter username')}
            />
            <Input
                className={classes.input}
                value={value}
                onChange={setValue}
                placeholder={t('Enter password')}
            />
            <Button className={classes.loginBtn} theme={ButtonTheme.OUTLINE}>
                {t('Login')}
            </Button>
        </div>
    );
};
