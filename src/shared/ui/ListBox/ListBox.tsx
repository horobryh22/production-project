import { Fragment, memo, ReactElement, ReactNode, useMemo } from 'react';

import { Listbox as HListBox } from '@headlessui/react';

import classes from './ListBox.module.scss';

import CheckIcon from 'shared/assets/icons/check.svg';
import { classNames } from 'shared/lib';
import { DropdownDirection } from 'shared/types/ui';
import { Button, ButtonTheme, HStack } from 'shared/ui';

interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    className?: string;
    defaultValue?: string;
    items: ListBoxItem[];
    value?: string;
    onChange: <T extends string>(value: T) => void;
    readonly?: boolean;
    label?: string;
    direction?: DropdownDirection;
}

const listBoxDirectionClass: Record<DropdownDirection, string> = {
    'top left': classes.optionsTopLeft,
    'top right': classes.optionsTopRight,
    'bottom left': classes.optionsBottomLeft,
    'bottom right': classes.optionsBottomRight,
};

export const ListBox = memo((props: ListBoxProps): ReactElement => {
    const {
        className,
        onChange,
        value,
        defaultValue,
        items,
        readonly,
        label,
        direction = 'bottom right',
    } = props;

    const mappedItems = useMemo(() => {
        return items.map(({ disabled, value, content }) => (
            <HListBox.Option key={value} value={value} as={Fragment} disabled={disabled}>
                {({ active, selected }) => (
                    <li
                        className={classNames(classes.item, {
                            [classes.active]: active,
                        })}
                    >
                        {selected && <CheckIcon className={classes.icon} />}
                        <span
                            className={classNames('', {
                                [classes.withPaddingLeft]: !selected,
                                [classes.disabled]: disabled,
                            })}
                        >
                            {content}
                        </span>
                    </li>
                )}
            </HListBox.Option>
        ));
    }, [items]);

    return (
        <HStack gap={'4'}>
            {label && <span>{label + '>'}</span>}
            <HListBox
                className={classNames(classes.ListBox, {}, [className])}
                value={value}
                onChange={onChange}
                as={'div'}
                disabled={readonly}
                defaultValue={defaultValue}
            >
                <HListBox.Button className={classes.button} as={'div'}>
                    <Button disabled={readonly} theme={ButtonTheme.OUTLINE}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(classes.options, {}, [
                        listBoxDirectionClass[direction],
                    ])}
                >
                    {mappedItems}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
});
