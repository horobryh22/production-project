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
import {
    getRoute404,
    getRouteAbout,
    getRouteAdmin,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteForbidden,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';
import { ExtendedRouteProps } from '@/shared/types/router';

export const routeConfig: ExtendedRouteProps[] = [
    { path: getRouteMain(), element: <MainPageAsync /> },
    { path: getRouteAbout(), element: <AboutPageAsync /> },
    { path: getRouteForbidden(), element: <ForbiddenPage /> },
    {
        path: getRouteAdmin(),
        element: <AdminPageAsync />,
        onlyAuth: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
        path: getRouteProfile(':id'),
        element: <ProfilePageAsync />,
        onlyAuth: true,
    },
    {
        path: getRouteArticles(),
        element: <ArticlesPageAsync />,
        onlyAuth: true,
    },
    {
        path: getRouteArticleCreate(),
        element: <ArticleEditPageAsync />,
        onlyAuth: true,
    },
    {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPageAsync />,
        onlyAuth: true,
    },
    {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPageAsync />,
        onlyAuth: true,
    },
    { path: getRoute404(), element: <NotFoundPage /> },
    {
        path: '*',
        element: <Navigate to={getRoute404()} />,
    },
];
