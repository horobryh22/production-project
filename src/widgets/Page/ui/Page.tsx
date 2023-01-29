import {
    Children,
    memo,
    MutableRefObject,
    ReactElement,
    ReactNode,
    UIEvent,
    useRef,
} from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { selectScrollPositionByPath } from '../model/selectors/uiPageSelectors';
import { uiPageSliceActions } from '../model/slice/uiPageSlice';

import classes from './Page.module.scss';

import { StateSchema } from 'app/providers/StoreProvider';
import {
    classNames,
    useAppDispatch,
    useInfiniteScroll,
    useInitialEffect,
    useThrottle,
} from 'shared/lib';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
    needParentRef?: boolean;
}

export const Page = memo((props: PageProps): ReactElement => {
    const { className, children, onScrollEnd, needParentRef } = props;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const scrollPosition = useSelector((state: StateSchema) =>
        selectScrollPositionByPath(state, pathname),
    );

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const mappedChildren = Children.map(children, (Child: any) => (
        <Child.type {...Child.props} ref={wrapperRef} />
    ));

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
            {needParentRef ? mappedChildren : children}
            {onScrollEnd ? <div className={classes.trigger} ref={triggerRef} /> : null}
        </section>
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
