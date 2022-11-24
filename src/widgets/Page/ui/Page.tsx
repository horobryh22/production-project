import { memo, MutableRefObject, ReactElement, ReactNode, UIEvent, useRef } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { selectScrollPositionByPath } from '../model/selectors/uiPageSelectors';
import { uiPageSliceActions } from '../model/slice/uiPageSlice';

import classes from './Page.module.scss';

import { StateSchema } from 'app/providers/StoreProvider';
import { classNames, useAppDispatch, useInfiniteScroll, useThrottle } from 'shared/lib';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps): ReactElement => {
    const { className, children, onScrollEnd } = props;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const scrollPosition = useSelector((state: StateSchema) =>
        selectScrollPositionByPath(state, pathname),
    );

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>): void => {
        dispatch(
            uiPageSliceActions.setScrollPosition({
                scroll: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 500);

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    return (
        <section
            onScroll={onScroll}
            ref={wrapperRef}
            className={classNames(classes.Page, {}, [className])}
        >
            {children}
            {onScrollEnd ? <div className={classes.trigger} ref={triggerRef} /> : null}
        </section>
    );
});
