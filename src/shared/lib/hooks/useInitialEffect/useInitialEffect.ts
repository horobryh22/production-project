import { useEffect } from 'react';

export const useInitialEffect = (cb: () => void, deps: any[]): void => {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            cb();
        }

        //eslint-disable-next-line
    }, [...deps]);
};
