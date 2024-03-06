import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';

export const login = (username: string, password: string): void => {
    cy.request({
        method: 'POST',
        url: Cypress.env('host') + `/login`,
        body: {
            username,
            password,
        },
    }).then(({ body }) => {
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(body));
    });
};
