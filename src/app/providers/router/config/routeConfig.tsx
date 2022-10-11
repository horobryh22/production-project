import React from 'react';

import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { AboutPageAsync } from 'pages/AboutPage';
import { MainPageAsync } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';

export enum AppRoute {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'not_found',
    ERROR = 'error',
}

export const RoutePath: Record<AppRoute, string> = {
    [AppRoute.MAIN]: '/',
    [AppRoute.ABOUT]: '/about',
    [AppRoute.NOT_FOUND]: '/not_found',
    [AppRoute.ERROR]: '*',
};

export const routeConfig: RouteObject[] = [
    { path: RoutePath[AppRoute.MAIN], element: <MainPageAsync /> },
    { path: RoutePath[AppRoute.ABOUT], element: <AboutPageAsync /> },
    { path: RoutePath[AppRoute.NOT_FOUND], element: <NotFoundPage /> },
    {
        path: RoutePath[AppRoute.ERROR],
        element: <Navigate to={RoutePath[AppRoute.NOT_FOUND]} />,
    },
];
