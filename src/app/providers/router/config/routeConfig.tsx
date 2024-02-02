import React from 'react';

import { Navigate } from 'react-router-dom';

import { UserRole } from '@/entities/User';
import { AboutPageAsync } from '@/pages/AboutPage';
import { AdminPageAsync } from '@/pages/AdminPage';
import { ArticleDetailsPageAsync } from '@/pages/ArticleDetailsPage';
import { ArticleEditPageAsync } from '@/pages/ArticleEditPage';
import { ArticlesPageAsync } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPageAsync } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePageAsync } from '@/pages/ProfilePage';
import { AppRoute, RoutePath } from '@/shared/const/router';
import { ExtendedRouteProps } from '@/shared/types/router';

export const routeConfig: ExtendedRouteProps[] = [
    { path: RoutePath[AppRoute.MAIN], element: <MainPageAsync /> },
    { path: RoutePath[AppRoute.ABOUT], element: <AboutPageAsync /> },
    { path: RoutePath[AppRoute.FORBIDDEN], element: <ForbiddenPage /> },
    {
        path: RoutePath[AppRoute.ADMIN],
        element: <AdminPageAsync />,
        onlyAuth: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
        path: RoutePath[AppRoute.PROFILE] + ':id',
        element: <ProfilePageAsync />,
        onlyAuth: true,
    },
    {
        path: RoutePath[AppRoute.ARTICLES],
        element: <ArticlesPageAsync />,
        onlyAuth: true,
    },
    {
        path: RoutePath[AppRoute.CREATE_ARTICLE],
        element: <ArticleEditPageAsync />,
        onlyAuth: true,
    },
    {
        path: RoutePath[AppRoute.EDIT_ARTICLE],
        element: <ArticleEditPageAsync />,
        onlyAuth: true,
    },
    {
        path: RoutePath[AppRoute.ARTICLES_DETAILS] + ':id',
        element: <ArticleDetailsPageAsync />,
        onlyAuth: true,
    },
    { path: RoutePath[AppRoute.NOT_FOUND], element: <NotFoundPage /> },
    {
        path: RoutePath[AppRoute.ERROR],
        element: <Navigate to={RoutePath[AppRoute.NOT_FOUND]} />,
    },
];
