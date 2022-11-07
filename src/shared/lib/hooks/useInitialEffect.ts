import { useEffect } from 'react';

export const useInitialEffect = (cb: () => void): void => {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            cb();
        }

        //eslint-disable-next-line
    }, []);
};
