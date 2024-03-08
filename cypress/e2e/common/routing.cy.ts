import {
    getRouteAdmin,
    getRouteArticles,
    getRouteProfile,
} from '../../../src/shared/const/router';

describe('Роутинг', () => {
    describe('Пользователь НЕ авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/');
            cy.selectByTestId('MainPage').should('exist');
        });

        it('Пользователя редиректит на главную', () => {
            cy.visit(getRouteProfile('1'));
            cy.selectByTestId('MainPage').should('exist');
        });

        it('Пользователя редиректит на 404', () => {
            cy.visit('/not_exist_page');
            cy.selectByTestId('NotFoundPage').should('exist');
        });
    });

    describe('Пользователь авторизован', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Пользователь получает доступ к странице профиля', () => {
            cy.visit(getRouteProfile('1'));
            cy.selectByTestId('ProfilePage').should('exist');
        });

        it('Пользователь получает доступ к странице статей', () => {
            cy.visit(getRouteArticles());
            cy.selectByTestId('ArticlesPage').should('exist');
        });

        it('Пользователь не получает доступ к странице админки', () => {
            cy.visit(getRouteAdmin());
            cy.selectByTestId('ForbiddenPage').should('exist');
        });

        it('Пользователь c правами администратора получает доступ к странице админки', () => {
            cy.logout();
            cy.login('admin', '123');
            cy.visit(getRouteAdmin());
            cy.selectByTestId('AdminPage').should('exist');
        });
    });
});
