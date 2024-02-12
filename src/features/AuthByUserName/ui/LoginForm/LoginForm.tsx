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
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import classes from './LoginForm.module.scss';

import { classNames, useAppDispatch, useDynamicModuleLoader } from '@/shared/lib';
import { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Button, ButtonTheme, Input } from '@/shared/ui';
import { Text, TextTheme } from '@/shared/ui';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const INITIAL_REDUCERS: ReducersList = {
    login: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps): ReactElement => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const username = useSelector(selectUsername);
    const password = useSelector(selectPassword);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    useDynamicModuleLoader(INITIAL_REDUCERS);

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

    const onLogin = useCallback(async (): Promise<void> => {
        const result = await dispatch(loginByUsername({ username, password }));

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, onSuccess, password, username]);

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

export default LoginForm;
