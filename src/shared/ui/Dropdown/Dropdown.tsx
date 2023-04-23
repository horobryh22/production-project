import { Fragment, memo, ReactElement, ReactNode } from 'react';

import { Menu } from '@headlessui/react';

import classes from './Dropdown.module.scss';

import { classNames } from 'shared/lib';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from 'shared/ui';

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

const dropdownDirectionClass: Record<DropdownDirection, string> = {
    'top left': classes.menuTopLeft,
    'top right': classes.menuTopRight,
    'bottom left': classes.menuBottomLeft,
    'bottom right': classes.menuBottomRight,
};

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
                            [classes.active]: active,
                            [classes.disabled]: disabled,
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
        <Menu as={'div'} className={classNames(classes.Dropdown, {}, [className])}>
            <Menu.Button className={classes.trigger} as={'div'}>
                {trigger}
            </Menu.Button>
            <Menu.Items
                className={classNames(classes.menu, {}, [
                    dropdownDirectionClass[direction],
                ])}
            >
                {mappedItems}
            </Menu.Items>
        </Menu>
    );
});
