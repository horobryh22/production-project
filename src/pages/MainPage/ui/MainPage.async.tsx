import React from 'react';

export const MainPageAsync = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 1500)).then(
        () => import('./MainPage')
    );
});