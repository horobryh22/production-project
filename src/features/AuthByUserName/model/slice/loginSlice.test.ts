import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { LoginSchema } from '../types';

import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
    let state: LoginSchema;

    beforeEach(() => {
        state = {
            username: '',
            password: '123',
            error: undefined,
            isLoading: false,
        };
    });

    test('correct name should be set in the state', () => {
        const updatedState = loginReducer(state, loginActions.setUsername('admin'));

        expect(updatedState.username).toBe('admin');
    });

    test('correct password should be set in the state', () => {
        const updatedState = loginReducer(state, loginActions.setPassword('123'));

        expect(updatedState.password).toBe('123');
    });

    test('loading should be finished', () => {
        const updatedState = loginReducer(
            state,
            loginByUsername.fulfilled({ id: '1', username: 'admin' }, '', {
                username: 'admin',
                password: '123',
            }),
        );

        expect(updatedState.isLoading).toBeFalsy();
    });
});
