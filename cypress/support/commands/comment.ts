export const addComment = (comment: string): void => {
    cy.selectByTestId('CommentForm').should('exist');
    cy.selectByTestId('CommentForm.Input').type(comment);
    cy.selectByTestId('CommentForm.Button').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(comment: string): Chainable<void>;
        }
    }
}
