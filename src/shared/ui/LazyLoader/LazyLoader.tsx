import { ReactElement, ReactNode, Suspense } from 'react';

import { IntersectionOptions, useInView } from 'react-intersection-observer';

interface LazyLoaderProps extends IntersectionOptions {
    children: ReactNode;
    fallback?: ReactElement;
}

export const LazyLoader = (props: LazyLoaderProps): ReactElement => {
    const { children, fallback, triggerOnce = true, threshold = 1, ...options } = props;

    const { ref, inView } = useInView({
        threshold,
        triggerOnce,
        ...options,
    });

    return (
        <Suspense fallback={fallback}>
            <div ref={ref}></div>
            {inView && children}
        </Suspense>
    );
};
