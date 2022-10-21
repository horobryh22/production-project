import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    selectError,
    selectIsLoading,
    selectPassword,
    selectUsername,
} from '../../model/selectors';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';

import classes from './LoginForm.module.scss';

import { useAppDispatch } from 'app/providers/StoreProvider/config/store';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme, Input } from 'shared/ui';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps): ReactElement => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const username = useSelector(selectUsername);
    const password = useSelector(selectPassword);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    const onChangeUsername = useCallback(
        (username: string): void => {
            dispatch(loginActions.setUsername(username));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (password: string): void => {
            dispatch(loginActions.setPassword(password));
        },
        [dispatch],
    );

    const onLogin = useCallback(() => {
        dispatch(loginByUsername());
    }, [dispatch]);

    return (
        <div className={classNames(classes.LoginForm, {}, [className])}>
            <Text title={t('Auth form')} />
            {error && (
                <Text
                    text={t('Enter the correct password or login')}
                    theme={TextTheme.ERROR}
                />
            )}
            <Input
                autoFocus
                className={classes.input}
                value={username}
                onChange={onChangeUsername}
                placeholder={t('Enter username')}
            />
            <Input
                className={classes.input}
                value={password}
                onChange={onChangePassword}
                placeholder={t('Enter password')}
            />
            <Button
                className={classes.loginBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={onLogin}
                disabled={isLoading}
            >
                {t('Login')}
            </Button>
        </div>
    );
});
