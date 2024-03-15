import { ARTICLE_COMMENT } from '../../consts/comments';

export const addComment = (comment: string): void => {
    // Мокируем запросы к **/comments* и добавляем комментарий в файл article-comments.json
    cy.intercept('POST', '**/comments*', req => {
        cy.readFile('cypress/fixtures/article-comments.json').then(comments => {
            const newComment = {
                ...ARTICLE_COMMENT,
                id: comments.length + 1,
                text: comment,
            };

            comments.push(newComment);

            cy.writeFile('cypress/fixtures/article-comments.json', comments).then(() => {
                req.body = comments;
            });
        });
    }).as('addComment');

    cy.selectByTestId('CommentForm').should('exist');
    cy.selectByTestId('CommentForm.Input').type(comment);
    cy.selectByTestId('CommentForm.Button').click();

    cy.wait('@addComment');
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(comment: string): Chainable<void>;
        }
    }
}
