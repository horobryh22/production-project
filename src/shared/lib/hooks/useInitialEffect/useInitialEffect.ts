import { useEffect } from 'react';

const ENVIRONMENTS = ['storybook', 'jest'];

export const useInitialEffect = (cb: () => void, deps: any[]): void => {
    useEffect(() => {
        if (!ENVIRONMENTS.includes(__PROJECT__)) {
            cb();
        }

        //eslint-disable-next-line
    }, [...deps]);
};
