import React, { ReactElement, Suspense } from 'react';

import { useRoutes } from 'react-router-dom';

import { routeConfig } from '../config/routeConfig';

import { PageLoader } from 'widgets/PageLoader';

export const AppRouter = (): ReactElement => {
    const elements = useRoutes(routeConfig);

    return (
        <Suspense fallback={<PageLoader />}>
            <div className="page-wrapper">{elements}</div>
        </Suspense>
    );
};
