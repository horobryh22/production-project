import { CounterSchema } from '../../types/CounterSchema';

import { StateSchema } from 'app/providers/StoreProvider';

export const selectCounter = (state: StateSchema): CounterSchema => state.counter;
