import type { Article } from '../../../src/entities/Article';
import { DEFAULT_ARTICLE } from '../../consts/article';

export const createArticle = (article?: Article): Cypress.Chainable<Article> => {
    return cy
        .authRequest<Article>({
            method: 'POST',
            url: Cypress.env('host') + `/articles`,
            body: article ?? DEFAULT_ARTICLE,
        })
        .then(({ body }) => {
            return body;
        });
};

export const removeArticle = (articleId: string): void => {
    cy.authRequest({
        method: 'DELETE',
        url: Cypress.env('host') + `/articles/${articleId}`,
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            removeArticle(articleId: string): Chainable<void>;
        }
    }
}
