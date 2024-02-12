import React, { ReactElement, Suspense, useMemo } from 'react';

import { Route, Routes } from 'react-router-dom';

import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from '../lib/RequireAuth/RequireAuth';
import { RequireRole } from '../lib/RequireRole/RequireRole';

export const AppRouter = (): ReactElement => {
    const elements = useMemo(() => {
        return routeConfig.map(({ element, onlyAuth, path, roles }) => {
            if (roles) {
                return (
                    <Route
                        key={path}
                        path={path}
                        element={<RequireRole roles={roles}>{element}</RequireRole>}
                    />
                );
            }

            if (onlyAuth) {
                return (
                    <Route
                        key={path}
                        path={path}
                        element={<RequireAuth>{element}</RequireAuth>}
                    />
                );
            }

            return <Route key={path} element={element} path={path} />;
        });
    }, []);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>{elements}</Routes>
        </Suspense>
    );
};
