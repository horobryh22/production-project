import type { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';

// instead of RootState
export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
}
