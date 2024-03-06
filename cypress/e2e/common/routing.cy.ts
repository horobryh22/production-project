import {
    getRouteAdmin,
    getRouteArticles,
    getRouteProfile,
} from '../../../src/shared/const/router';
import { selectByTestId } from '../../helpers/selectByTestId';

describe('Роутинг', () => {
    describe('Пользователь НЕ авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it('Пользователя редиректит на главную', () => {
            cy.visit(getRouteProfile('1'));
            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it('Пользователя редиректит на 404', () => {
            cy.visit('/not_exist_page');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('Пользователь авторизован', () => {
        beforeEach(() => {
            cy.login(Cypress.env('auth_username'), Cypress.env('auth_password'));
        });

        it('Пользователь получает доступ к странице профиля', () => {
            cy.visit(getRouteProfile('1'));
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Пользователь получает доступ к странице статей', () => {
            cy.visit(getRouteArticles());
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });

        it('Пользователь не получает доступ к странице админки', () => {
            cy.visit(getRouteAdmin());
            cy.get(selectByTestId('ForbiddenPage')).should('exist');
        });

        it('Пользователь c правами администратора получает доступ к странице админки', () => {
            cy.logout();
            cy.login(Cypress.env('admin_username'), Cypress.env('admin_password'));
            cy.visit(getRouteAdmin());
            cy.get(selectByTestId('AdminPage')).should('exist');
        });
    });
});
