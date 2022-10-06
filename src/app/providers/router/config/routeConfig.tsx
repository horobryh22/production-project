import React from 'react';

import type { RouteObject } from 'react-router-dom';

import { AboutPageAsync } from 'pages/AboutPage';
import { MainPageAsync } from 'pages/MainPage';

export enum AppRoute {
    MAIN = 'main',
    ABOUT = 'about',
}

export const RoutePath: Record<AppRoute, string> = {
    [AppRoute.MAIN]: '/',
    [AppRoute.ABOUT]: '/about',
};

export const routeConfig: RouteObject[] = [
    { path: RoutePath[AppRoute.MAIN], element: <MainPageAsync /> },
    { path: RoutePath[AppRoute.ABOUT], element: <AboutPageAsync /> },
];
