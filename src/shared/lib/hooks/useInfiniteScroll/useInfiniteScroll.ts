import { MutableRefObject, useEffect } from 'react';

interface useInfiniteScrollOptions {
    wrapperRef: MutableRefObject<HTMLElement>;
    triggerRef: MutableRefObject<HTMLDivElement>;
    callback?: () => void;
}

export const useInfiniteScroll = (props: useInfiniteScrollOptions): void => {
    const { triggerRef, wrapperRef, callback } = props;

    useEffect(() => {
        const root = wrapperRef.current;
        const trigger = triggerRef.current;
        let observer: IntersectionObserver | null = null;

        if (callback) {
            let options = {
                root,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(trigger);

            return () => {
                if (observer) {
                    observer.unobserve(trigger);
                }
            };
        }
    }, [callback, triggerRef, wrapperRef]);
};
