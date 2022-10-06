import React, { ReactElement, Suspense } from 'react';

import { useRoutes } from 'react-router-dom';

import { routeConfig } from '../config/routeConfig';

export const AppRouter = (): ReactElement => {
    const elements = useRoutes(routeConfig);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="page-wrapper">{elements}</div>
        </Suspense>
    );
};
