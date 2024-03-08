import { getRouteArticleDetails } from '../../../src/shared/const/router';
import { DEFAULT_ARTICLE } from '../../consts/article';

let CREATED_ARTICLE_ID: string = '';

describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login();
        cy.createArticle().then(article => {
            CREATED_ARTICLE_ID = article.id;
            cy.visit(getRouteArticleDetails(CREATED_ARTICLE_ID));
        });
    });

    afterEach(() => {
        cy.removeArticle(CREATED_ARTICLE_ID);
    });

    it('Пользователь видит содержимое статьи', () => {
        cy.selectByTestId('ArticleDetails').should('exist');
        cy.selectByTestId('ArticleDetails.Header').should(
            'have.text',
            DEFAULT_ARTICLE.title,
        );
    });

    it('Пользователь видит список рекомендованных статей', () => {
        // ждем пока контент страницы будет полностью загружен
        cy.wait(2000);

        // чтоб компонента ArticleRecommendationsList появилась необходимо проскроллить вниз, так как она у нас loadable
        cy.selectByTestId('ArticleDetailsPage').scrollTo('bottom');
        cy.selectByTestId('ArticleRecommendationsList').should('exist');
    });

    it('Пользователь оставляет комментарий', () => {
        const comment = 'Отличная статья';

        // ждем пока контент страницы будет полностью загружен
        cy.wait(2000);

        // чтоб компонента ArticleComments появилась необходимо проскроллить вниз, так как она у нас loadable
        cy.selectByTestId('ArticleDetailsPage').scrollTo('bottom');

        // добавляем один комментарий
        cy.addComment(comment);
        cy.selectByTestId('CommentsList').should('have.length', 1);

        // добавляем еще несколько комментариев
        cy.addComment(comment);
        cy.addComment(comment);
        cy.selectByTestId('CommentList.Item').should('have.length', 3);
    });

    it('Пользователь оценивает статью', () => {
        const feedback = 'Отличная статья';

        // ждем пока контент страницы будет полностью загружен
        cy.wait(2000);

        // чтоб компонента ArticleRating появилась необходимо проскроллить вниз, так как она у нас loadable
        cy.selectByTestId('ArticleDetailsPage').scrollTo('bottom');

        // пользователь оценивает статью
        cy.setRate(4, feedback);
        cy.get('[data-selected=true]').should('have.length', 4);
    });
});
