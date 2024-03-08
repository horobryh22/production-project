import { getRouteProfile } from '@/shared/const/router';

import { DEFAULT_PROFILE } from '../../consts/profile';

let AUTH_USER_PROFILE_ID: string = '';

describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then(user => {
            AUTH_USER_PROFILE_ID = user.id;
            cy.visit(getRouteProfile(AUTH_USER_PROFILE_ID));
        });
    });

    afterEach(() => {
        cy.resetProfile(AUTH_USER_PROFILE_ID);
    });

    it('Профиль успешно загружен', () => {
        cy.selectByTestId('EditableProfileCard.Lastname').should(
            'have.value',
            DEFAULT_PROFILE.lastname,
        );
    });

    it('Профиль успешно обновлен', () => {
        const username = 'Илья';
        const lastname = 'Хоробрых';

        cy.updateProfile({ username, lastname });
        cy.selectByTestId('EditableProfileCard.Firstname').should('have.value', username);
        cy.selectByTestId('EditableProfileCard.Lastname').should('have.value', lastname);
    });
});
