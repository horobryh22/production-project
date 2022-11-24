import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { Currency } from '../../model/types';

import classes from './CurrencySelect.module.scss';

import { classNames } from 'shared/lib';
import { Mods } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui';
import { SelectOptions } from 'shared/ui/Select/Select';

const options: SelectOptions<Currency>[] = [
    { content: Currency.RUB, value: Currency.RUB },
    { content: Currency.EURO, value: Currency.EURO },
    { content: Currency.USD, value: Currency.USD },
];

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (currency: Currency) => void;
    readonly?: boolean;
}

export const CurrencySelect = memo(
    ({ className, onChange, value, readonly }: CurrencySelectProps): ReactElement => {
        const { t } = useTranslation();

        const handleChange = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        const mods: Mods = {
            [classes.readonly]: readonly,
        };

        return (
            <Select
                className={classNames('', mods, [className])}
                onChange={handleChange}
                value={value}
                label={t('Select your currency')}
                options={options}
                readonly={readonly}
            />
        );
    },
);
