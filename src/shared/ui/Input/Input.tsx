import { ChangeEvent, InputHTMLAttributes, memo, ReactElement, useState } from 'react';

import classes from './Input.module.scss';

import { classNames } from 'shared/lib';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    onChange?: (value: string) => void;
    value?: string;
}

export const Input = memo((props: InputProps): ReactElement => {
    const {
        type = 'text',
        onChange,
        value,
        className,
        placeholder,
        ...restProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

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

    return (
        <div className={classNames(classes.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={classes.placeholder}>{`${placeholder}>`}</div>
            )}
            <div className={classes.caretWrapper}>
                <input
                    {...restProps}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={classes.input}
                    type={type}
                    onChange={handleChange}
                    value={value}
                    onSelect={handleSelect}
                />
                {isFocused && (
                    <span
                        style={{ left: `${caretPosition * 9.5}px` }}
                        className={classes.caret}
                    />
                )}
            </div>
        </div>
    );
});
