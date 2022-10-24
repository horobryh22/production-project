import React, { ReactElement, Suspense, useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { AppRouter } from 'app/providers/router';
import { userActions } from 'entities/User';
import { classNames, useAppDispatch } from 'shared/lib';
import { ErrorFallback } from 'shared/ui';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = (): ReactElement => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app')}>
            <Suspense fallback="">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Navbar />
                    <div className="app-content">
                        <Sidebar />
                        <AppRouter />
                    </div>
                </ErrorBoundary>
            </Suspense>
        </div>
    );
};

export default App;
