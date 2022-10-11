import React, { ReactElement, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { AppRouter } from 'app/providers/router';
import { classNames, useTheme } from 'shared/lib';
import { ErrorFallback } from 'shared/ui';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = (): ReactElement => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
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
