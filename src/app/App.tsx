import React, { ReactElement, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { AppRouter } from 'app/providers/router';
import { classNames } from 'shared/lib';
import { ErrorFallback } from 'shared/ui';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = (): ReactElement => {
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
