import { memo, MutableRefObject, ReactElement, ReactNode, useRef } from 'react';

import classes from './Page.module.scss';

import { classNames, useInfiniteScroll } from 'shared/lib';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps): ReactElement => {
    const { className, children, onScrollEnd } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    return (
        <section ref={wrapperRef} className={classNames(classes.Page, {}, [className])}>
            {children}
            <div ref={triggerRef} />
        </section>
    );
});
