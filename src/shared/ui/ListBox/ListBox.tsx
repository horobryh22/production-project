import { Fragment, memo, ReactElement, ReactNode } from 'react';

import { Listbox as HListBox } from '@headlessui/react';

import classes from './ListBox.module.scss';

import CheckIcon from 'shared/assets/icons/check.svg';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme, HStack } from 'shared/ui';

type ListBoxDirection = 'bottom' | 'top';

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
    direction?: ListBoxDirection;
}

const listBoxDirectionClass: Record<ListBoxDirection, string> = {
    top: classes.directionTop,
    bottom: classes.directionBottom,
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
        direction = 'bottom',
    } = props;

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
                <HListBox.Button className={classes.button}>
                    <Button disabled={readonly} theme={ButtonTheme.OUTLINE}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(classes.options, {}, [
                        listBoxDirectionClass[direction],
                    ])}
                >
                    {items.map(({ disabled, value, content }) => (
                        <HListBox.Option
                            key={value}
                            value={value}
                            as={Fragment}
                            disabled={disabled}
                        >
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
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
});
