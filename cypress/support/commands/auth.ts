import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';

import type { User } from '../../../src/entities/User';

export const login = (username?: string, password?: string) => {
    return cy
        .request({
            method: 'POST',
            url: Cypress.env('host') + `/login`,
            body: {
                username: username ?? Cypress.env('auth_username'),
                password: password ?? Cypress.env('auth_password'),
            },
        })
        .then(({ body }) => {
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(body));

            return body;
        });
};

export const logout = (): void => {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};

declare global {
    namespace Cypress {
        interface Chainable {
            login(username?: string, password?: string): Chainable<User>;
            logout(): Chainable<void>;
        }
    }
}
