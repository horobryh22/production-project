import { getRouteArticles } from '../../../src/shared/const/router';

describe('Пользователь заходит на страницу со статьями', () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.visit(getRouteArticles());
        });
    });

    it('Страница со статьями успешно загружена', () => {
        cy.selectByTestId('ArticlesPage').should('exist');
        cy.selectByTestId('ArticleItem.Tile').should('have.length.greaterThan', 3);
    });

    it('Вид отображения контента успешно изменен', () => {
        cy.selectByTestId('ArticleItem.Tile').should('exist');

        // получаем классы на иконках для переключения темы
        cy.selectByTestId('ViewSwitcher.Tile.Icon')
            .invoke('attr', 'class')
            .as('tile-icon');
        cy.selectByTestId('ViewSwitcher.List.Icon')
            .invoke('attr', 'class')
            .as('list-icon');

        // проверяем наличие нужных классов до взаимодействия с пользователем
        cy.get('@tile-icon').should('not.match', /no-active/);
        cy.get('@list-icon').should('match', /no-active/);

        cy.selectByTestId('ViewSwitcher.List').click();

        // проверяем наличие нужных классов после взаимодействия с пользователем
        cy.get('@list-icon').should('not.match', /no-active/);
        cy.get('@tile-icon').should('match', /no-active/);

        cy.selectByTestId('ArticleItem.List').should('exist');
    });

    it('После ввода текста в поисковую строку, запрос успешно выполняется', () => {
        cy.intercept('GET', Cypress.env('host') + '/articles', []).as('articles');
        cy.selectByTestId('ArticleFilterBlock.Input').as('input').should('exist');
        // TODO доработать фнукционал по тестированию запросов
    });
});
