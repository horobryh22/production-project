import React from 'react';

export const AboutPageAsync = React.lazy(async () => {
    return await new Promise(resolve => setTimeout(resolve, 1500)).then(
        async () => await import('./AboutPage'),
    );
});
