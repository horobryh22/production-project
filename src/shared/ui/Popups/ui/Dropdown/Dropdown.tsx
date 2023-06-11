import { Fragment, memo, ReactElement, ReactNode } from 'react';

import { Menu } from '@headlessui/react';

import { AppLink } from '../../../AppLink/AppLink';
import popupCls from '../../styles/popups.module.scss';

import classes from './Dropdown.module.scss';

import { classNames } from '@/shared/lib';
import { DropdownDirection } from '@/shared/types/ui';
import { popupDirectionClass } from '@/shared/ui/Popups/styles';

export interface DropdownItems {
    href?: string;
    content?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}
interface DropdownProps {
    className?: string;
    items: DropdownItems[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

export const Dropdown = memo((props: DropdownProps): ReactElement => {
    const { className, trigger, items, direction = 'bottom right' } = props;

    const mappedItems = items.map(({ onClick, content, disabled, href }, index) => {
        const Component = href ? AppLink : 'button';

        return (
            <Menu.Item
                key={index}
                disabled={disabled}
                as={Fragment}
                refName={href ? 'href' : undefined}
            >
                {({ active, disabled }) => (
                    <Component
                        className={classNames(classes.item, {
                            [popupCls.active]: active,
                            [popupCls.disabled]: disabled,
                        })}
                        to={href ? href : ''}
                        onClick={onClick}
                    >
                        {content}
                    </Component>
                )}
            </Menu.Item>
        );
    });

    return (
        <Menu
            as={'div'}
            className={classNames(classes.Dropdown, {}, [className, popupCls.popup])}
        >
            <Menu.Button className={popupCls.trigger} as={'div'}>
                {trigger}
            </Menu.Button>
            <Menu.Items
                className={classNames(classes.menu, {}, [popupDirectionClass[direction]])}
            >
                {mappedItems}
            </Menu.Items>
        </Menu>
    );
});
