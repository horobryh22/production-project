import { memo, ReactNode, useCallback, useEffect } from 'react';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import classes from './Drawer.module.scss';

import { classNames } from 'shared/lib';
import { Mods } from 'shared/lib/classNames/classNames';
import { useAnimationModules } from 'shared/lib/providers';

export interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    testMode?: boolean;
}

const DRAWER_ROOT = document.getElementById('drawer-root') || undefined;
const HEIGHT = window.innerHeight - 100;

const DrawerContent = memo((props: DrawerProps) => {
    const { className, children, isOpen, onClose, testMode } = props;
    const { Spring, Gesture } = useAnimationModules();

    const { useSpring, a, config } = Spring!;
    const { useDrag } = Gesture!;

    const [{ y }, api] = useSpring(() => ({ y: HEIGHT }));

    const onOpenDrawer = useCallback(() => {
        api.start({
            y: 0,
            immediate: false,
        });
    }, [api]);
    const close = (velocity = 0): void => {
        api.start({
            y: HEIGHT,
            immediate: false,
            config: { ...config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = useDrag(
        ({ last, velocity: [, vy], direction: [, dy], movement: [my], cancel }) => {
            if (my < -70) cancel();

            if (last) {
                if (my > HEIGHT * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    onOpenDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    useEffect(() => {
        if (isOpen) {
            onOpenDrawer();
        }
    }, [api, isOpen, onOpenDrawer]);

    const mods: Mods = {
        [classes.opened]: isOpen,
    };

    const display = y.to(py => (py < HEIGHT ? 'block' : 'none'));

    const drawerElement = (
        <div className={classNames(classes.Drawer, mods, [className])}>
            <Overlay onClick={close} />
            <a.div
                className={classes.sheet}
                {...bind()}
                style={{ display, bottom: `calc(-100vh + ${HEIGHT - 100}px)`, y }}
            >
                {children}
            </a.div>
        </div>
    );

    if (!isOpen) return null;

    if (testMode) return drawerElement;

    return <Portal container={DRAWER_ROOT}>{drawerElement}</Portal>;
});

export const Drawer = memo(({ children, ...props }: DrawerProps) => {
    const { isLoaded } = useAnimationModules();

    if (!isLoaded) {
        // здесь можно также отрисовывать скелетон к примеру,
        // или как-то обрабатывать ошибку, если она есть и если ее передавать
        return null;
    }

    return <DrawerContent {...props}>{children}</DrawerContent>;
});
