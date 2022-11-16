import { ChangeEvent, InputHTMLAttributes, memo, ReactElement, useState } from 'react';

import classes from './Input.module.scss';

import { classNames } from 'shared/lib';
import { Mods } from 'shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    onChange?: (value: string) => void;
    value?: string | number;
    readonly?: boolean;
}

export const Input = memo((props: InputProps): ReactElement => {
    const {
        type = 'text',
        onChange,
        value,
        className,
        placeholder,
        readonly,
        disabled,
        ...restProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    const isCaretVisible = isFocused && !readonly;

    const handleBlur = (): void => {
        setIsFocused(false);
    };

    const handleFocus = (): void => {
        setIsFocused(true);
    };

    const handleSelect = (e: any): void => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.currentTarget.value;

        onChange?.(value);

        if (caretPosition) {
            setCaretPosition(caretPosition);
        } else {
            setCaretPosition(value.length);
        }
    };

    const mods: Mods = {
        [classes.readonly]: readonly,
        [classes.disabled]: disabled,
    };

    return (
        <div className={classNames(classes.InputWrapper, mods, [className])}>
            {placeholder && (
                <div className={classes.placeholder}>{`${placeholder}>`}</div>
            )}
            <div className={classes.caretWrapper}>
                <input
                    {...restProps}
                    disabled={disabled}
                    readOnly={readonly}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={classes.input}
                    type={type}
                    onChange={handleChange}
                    value={value}
                    onSelect={handleSelect}
                />
                {isCaretVisible && (
                    <span
                        style={{ left: `${caretPosition * 9.5}px` }}
                        className={classes.caret}
                    />
                )}
            </div>
        </div>
    );
});
