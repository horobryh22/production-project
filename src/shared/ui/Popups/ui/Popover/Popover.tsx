import { memo, ReactElement, ReactNode } from 'react';

import { Popover as HPopover } from '@headlessui/react';

import { classNames } from '@/shared/lib';
import { DropdownDirection } from '@/shared/types/ui';

import { popupDirectionClass } from '../../styles/index';
import popupCls from '../../styles/popups.module.scss';

import classes from './Popover.module.scss';

export interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
}

export const Popover = memo((props: PopoverProps): ReactElement => {
    const { className, trigger, children, direction = 'bottom left' } = props;

    return (
        <HPopover
            className={classNames(classes.Popover, {}, [className, popupCls.popup])}
        >
            <HPopover.Button as={'div'} className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel
                className={classNames(classes.panel, {}, [
                    popupDirectionClass[direction],
                ])}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
