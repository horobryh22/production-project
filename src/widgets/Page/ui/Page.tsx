import { memo, MutableRefObject, ReactElement, ReactNode, UIEvent, useRef } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';
import {
    classNames,
    useAppDispatch,
    useInfiniteScroll,
    useInitialEffect,
    useThrottle,
} from '@/shared/lib';

import { selectScrollPositionByPath } from '../model/selectors/uiPageSelectors';
import { uiPageSliceActions } from '../model/slice/uiPageSlice';

import classes from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
    setScrollPageRef?: (ref: MutableRefObject<HTMLDivElement>) => void;
}

export const Page = memo((props: PageProps): ReactElement => {
    const { className, children, onScrollEnd, setScrollPageRef } = props;

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
        if (wrapperRef) {
            setScrollPageRef?.(wrapperRef);
        }
    }, []);

    return (
        <main
            onScroll={onScroll}
            ref={wrapperRef}
            className={classNames(classes.Page, {}, [className])}
        >
            {children}
            {onScrollEnd ? <div className={classes.trigger} ref={triggerRef} /> : null}
        </main>
    );
});

{
    /*
либо можем создать хук
function useRefs() {
  const refs = useRef({});

  const register = useCallback((refName) => ref => {
    refs.current[refName] = ref;
  }, []);

  return [refs, register];
}

и использовать его внутри компоненты, назначая дочерным компонентам рефы
и иметь возможность доступа к ним в родителе

 const [refs, register] = useRefs();

   {React.Children.map((Child, index) => (
       <Child.type
         {...Child.props}
         ref={register(`${field-${index}}`)}
         />
    )}
*/
}
