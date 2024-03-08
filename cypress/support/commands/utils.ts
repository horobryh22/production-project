import { USER_LOCAL_STORAGE_KEY } from '../../../src/shared/const/localStorage';

export const selectByTestId = (
    testId: string,
): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(`[data-testid="${testId}"]`);
};

export const authRequest = <T>(
    options: Partial<Cypress.RequestOptions>,
): Cypress.Chainable<Cypress.Response<T>> => {
    const token = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '';

    return cy.request({
        ...options,
        headers: { ...options.headers, Authorization: token },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            selectByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>>;
            authRequest<T>(
                options: Partial<RequestOptions>,
            ): Cypress.Chainable<Response<T>>;
        }
    }
}
