import React from 'react';

import { Navigate } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';

import { AboutPageAsync } from 'pages/AboutPage';
import { ArticleDetailsPageAsync } from 'pages/ArticleDetailsPage';
import { ArticlesPageAsync } from 'pages/ArticlesPage';
import { MainPageAsync } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePageAsync } from 'pages/ProfilePage';

type ExtendedRouteProps = RouteProps & { onlyAuth?: boolean };

export enum AppRoute {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    NOT_FOUND = 'not_found',
    ARTICLES = 'articles',
    ARTICLES_DETAILS = 'articles_details',
    ERROR = 'error',
}

export const RoutePath: Record<AppRoute, string> = {
    [AppRoute.MAIN]: '/',
    [AppRoute.ABOUT]: '/about',
    [AppRoute.PROFILE]: '/profile',
    [AppRoute.ARTICLES]: '/articles',
    [AppRoute.ARTICLES_DETAILS]: '/articles/',
    [AppRoute.NOT_FOUND]: '/not_found',
    [AppRoute.ERROR]: '*',
};

export const routeConfig: ExtendedRouteProps[] = [
    { path: RoutePath[AppRoute.MAIN], element: <MainPageAsync /> },
    { path: RoutePath[AppRoute.ABOUT], element: <AboutPageAsync /> },
    { path: RoutePath[AppRoute.PROFILE], element: <ProfilePageAsync />, onlyAuth: true },
    {
        path: RoutePath[AppRoute.ARTICLES],
        element: <ArticlesPageAsync />,
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
