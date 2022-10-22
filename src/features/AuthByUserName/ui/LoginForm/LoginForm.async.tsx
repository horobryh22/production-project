import { FC, lazy } from 'react';

import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(async () => {
    return await new Promise(resolve => setTimeout(resolve, 1500)).then(
        async () => await import('./LoginForm'),
    );
});
