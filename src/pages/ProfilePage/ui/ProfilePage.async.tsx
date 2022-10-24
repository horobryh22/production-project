import React from 'react';

export const ProfilePageAsync = React.lazy(async () => {
    return await new Promise(resolve => setTimeout(resolve, 1500)).then(
        async () => await import('./ProfilePage'),
    );
});
