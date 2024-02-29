import { act, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { UserRole } from '@/entities/User';
import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { renderComponent } from '@/shared/lib/tests/renderComponent';

import { AppRouter } from './AppRouter';

describe('app/router/AppRouter', () => {
    test('Страница должна отрендериться', async () => {
        renderComponent(<AppRouter />, { route: getRouteAbout() });

        const aboutPage = await screen.findByTestId('AboutPage');

        expect(aboutPage).toBeInTheDocument();
    });

    test('Страница не найдена', async () => {
        renderComponent(<AppRouter />, { route: '/dasdasdasdasd' });

        const notFoundPage = await screen.findByTestId('NotFoundPage');

        expect(notFoundPage).toBeInTheDocument();
    });

    test('Редирект на главную для неавторизованного пользователя', async () => {
        renderComponent(<AppRouter />, { route: getRouteProfile('1') });

        const mainPage = await screen.findByTestId('MainPage');

        expect(mainPage).toBeInTheDocument();
    });

    test('Страница профиля доступна для авторизованного пользователя', async () => {
        // оборачиваем в act так как на странице ProfilePage есть lazy компонент, который подгружается динамически
        await act(() =>
            renderComponent(<AppRouter />, {
                route: getRouteProfile('1'),
                initialState: { user: { isUserAuth: true, authData: { id: '1' } } },
            }),
        );

        mockAllIsIntersecting(true); // мокаем intersectionObserver
        const profilePage = await screen.findByTestId('ProfilePage');

        expect(profilePage).toBeInTheDocument();
    });

    test('Страница админки закрыта для пользователя без прав', async () => {
        renderComponent(<AppRouter />, {
            route: getRouteAdmin(),
        });

        const forbiddenPage = await screen.findByTestId('ForbiddenPage');

        expect(forbiddenPage).toBeInTheDocument();
    });

    test('Страница админки доступна для пользователя с правами', async () => {
        renderComponent(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: { user: { authData: { roles: [UserRole.ADMIN] } } },
        });

        const adminPage = await screen.findByTestId('AdminPage');

        expect(adminPage).toBeInTheDocument();
    });
});
