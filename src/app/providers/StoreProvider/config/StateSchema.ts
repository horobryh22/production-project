import type { CounterSchema } from 'entities/Counter';

// instead of RootState
export interface StateSchema {
    counter: CounterSchema;
}
