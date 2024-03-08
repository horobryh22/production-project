import { Profile } from '../../../src/entities/Profile';
import { DEFAULT_PROFILE } from '../../consts/profile';

export const updateProfile = (profileData: Profile): void => {
    cy.selectByTestId('ProfilePageButton.Edit').click();
    cy.selectByTestId('EditableProfileCard.Firstname')
        .clear()
        .type(profileData.username ?? 'username');
    cy.selectByTestId('EditableProfileCard.Lastname')
        .clear()
        .type(profileData.lastname ?? 'lastname');
    cy.selectByTestId('ProfilePageButton.Save').click();
};

export const resetProfile = (profileId: string, profileData: Profile): void => {
    cy.authRequest({
        method: 'PUT',
        url: Cypress.env('host') + `/profile/${profileId}`,
        body: profileData ?? DEFAULT_PROFILE,
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(profileData: Profile): Chainable<void>;
            resetProfile(profileId: string, profileData?: Profile): Chainable<void>;
        }
    }
}
