import type { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';

// instead of RootState
export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    login: LoginSchema;
}
