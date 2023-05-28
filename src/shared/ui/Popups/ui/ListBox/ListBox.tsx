import { Fragment, memo, ReactElement, ReactNode, useMemo } from 'react';

import { Listbox as HListBox } from '@headlessui/react';

import { Button, ButtonTheme } from '../../../Button/Button';
import { HStack } from '../../../Stack/HStack/HStack';
import popupCls from '../../styles/popups.module.scss';

import classes from './ListBox.module.scss';

import CheckIcon from 'shared/assets/icons/check.svg';
import { classNames } from 'shared/lib';
import { DropdownDirection } from 'shared/types/ui';
import { popupDirectionClass } from 'shared/ui/Popups/styles';

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
                            [popupCls.active]: active,
                        })}
                    >
                        {selected && <CheckIcon className={classes.icon} />}
                        <span
                            className={classNames('', {
                                [classes.withPaddingLeft]: !selected,
                                [popupCls.disabled]: disabled,
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
                className={classNames(classes.ListBox, {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
                as={'div'}
                disabled={readonly}
                defaultValue={defaultValue}
            >
                <HListBox.Button className={popupCls?.trigger} as={'div'}>
                    <Button disabled={readonly} theme={ButtonTheme.OUTLINE}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(classes.options, {}, [
                        popupDirectionClass[direction],
                    ])}
                >
                    {mappedItems}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
});
