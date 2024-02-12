import React, { ReactElement, Suspense, useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';

import { selectInitialized, userActions } from '@/entities/User';
import { classNames, useAppDispatch } from '@/shared/lib';
import { ErrorFallback } from '@/shared/ui';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

const App = (): ReactElement => {
    const dispatch = useAppDispatch();
    const _initialized = useSelector(selectInitialized);

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
                        {_initialized && <AppRouter />}
                    </div>
                </ErrorBoundary>
            </Suspense>
        </div>
    );
};

export default App;
