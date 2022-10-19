import { counterActions, counterReducer } from '../slice/counterSlice';

import { CounterSchema } from 'entities/Counter';

let state: CounterSchema;

beforeEach(() => {
    state = {
        value: 10,
    };
});

describe('counterSlice.test', () => {
    test('should decrease value in state', () => {
        expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 9 });
    });

    test('should increase value in state', () => {
        expect(counterReducer(state, counterActions.increment())).toEqual({ value: 11 });
    });

    test('should return correct state', () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({
            value: 1,
        });
    });
});
