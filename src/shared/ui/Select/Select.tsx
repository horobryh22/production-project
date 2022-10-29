import { ChangeEvent, memo, ReactElement, useMemo } from 'react';

import classes from './Select.module.scss';

import { classNames } from 'shared/lib';

export interface SelectOptions {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOptions[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps): ReactElement => {
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
        onChange?.(e.currentTarget.value);
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
});
