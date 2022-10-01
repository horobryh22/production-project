import React from 'react';

export const AboutPageAsync = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 1500)).then(
        () => import('./AboutPage')
    );
});