import { getRouteArticleDetails } from '../../../src/shared/const/router';
import { DEFAULT_ARTICLE } from '../../consts/article';
import { ARTICLE_COMMENT } from '../../consts/comments';

let CREATED_ARTICLE_ID: string = '';

describe('Пользователь заходит на страницу статьи', () => {
    describe('Тестирование с использованием API', () => {
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

        it.skip('Пользователь видит содержимое статьи', () => {
            // ждем пока контент страницы будет полностью загружен
            cy.wait(2000);

            cy.selectByTestId('ArticleDetails').should('exist');
            cy.selectByTestId('ArticleDetails.Title.Header').should(
                'have.text',
                DEFAULT_ARTICLE.title,
            );
        });
    });

    describe('Тестирование на фикстурах (стабах)', () => {
        beforeEach(() => {
            cy.visit('');
            cy.login();
            cy.visit(getRouteArticleDetails('1'));
            cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });

            // добавляем комментарий в файл, чтобы протестировать их получение
            cy.writeFile('cypress/fixtures/article-comments.json', [ARTICLE_COMMENT]);
        });

        afterEach(() => {
            // в конце теста очищаем данные для фикстур с комментариями
            cy.writeFile('cypress/fixtures/article-comments.json', []);
        });

        it.skip('Пользователь видит список рекомендованных статей', () => {
            // получаем рекомендованные статьи из фикстур
            cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });

            // ждем пока контент страницы будет полностью загружен
            cy.wait(2000);

            // чтоб компонента ArticleRecommendationsList появилась необходимо проскроллить вниз, так как она у нас loadable
            cy.selectByTestId('ArticleDetailsPage').scrollTo('bottom');
            cy.selectByTestId('ArticleRecommendationsList').should('exist');
        });

        it('Пользователь оставляет комментарий', () => {
            // Мокируем запроc за получением комментариев и возвращаем содержимое файла article-comments.json
            cy.intercept('GET', '**/comments?*', { fixture: 'article-comments.json' });

            // Ждем пока контент страницы будет полностью загружен
            cy.wait(2000);

            // Чтобы компонента ArticleComments появилась, необходимо проскроллить вниз, так как она у вас loadable
            cy.selectByTestId('ArticleDetailsPage').scrollTo('bottom');

            // Добавляем один комментарий
            cy.addComment('Новый комментарий');
            cy.selectByTestId('CommentList.Item').should('have.length', 2);

            // Добавляем еще несколько комментариев
            cy.addComment('Еще один комментарий');
            cy.addComment('И еще один комментарий');

            cy.selectByTestId('CommentList.Item').should('have.length', 4);
        });

        it.skip('Пользователь оценивает статью', () => {
            cy.intercept('GET', '**/article-rating?*', {
                fixture: 'article-rating.json',
            });

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
});
