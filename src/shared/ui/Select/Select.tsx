import { ChangeEvent, ReactElement, useMemo } from 'react';

import { classNames } from '@/shared/lib';

import classes from './Select.module.scss';

export interface SelectOptions<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOptions<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>): ReactElement => {
    const { className, options, label, value, onChange, readonly } = props;

    const optionsList = useMemo(() => {
        return options?.map(({ content, value }) => {
            return (
                <option key={value} value={value}>
                    {content}
                </option>
            );
        });
    }, [options]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        onChange?.(e.currentTarget.value as T);
    };

    return (
        <div className={classNames(classes.Wrapper, {}, [className])}>
            <span className={classes.label}>{label + '>'}</span>
            <select
                value={value}
                disabled={readonly}
                onChange={handleChange}
                className={classes.select}
            >
                {optionsList}
            </select>
        </div>
    );
};
