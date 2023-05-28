import loadable from '@loadable/component';

import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = loadable<LoginFormProps>(() => import('./LoginForm'));
