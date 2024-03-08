export const setRate = (star: number, feedback?: string): void => {
    cy.selectByTestId('RatingCard').should('exist');
    cy.selectByTestId(`RatingCard.Star${star}`).click();
    cy.selectByTestId('RatingCard.Modal').should('exist');

    if (feedback) {
        cy.selectByTestId('RatingCard.Input').type(feedback);
    }

    cy.selectByTestId('RatingCard.Send').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(star: number, feedback?: string): Chainable<void>;
        }
    }
}
