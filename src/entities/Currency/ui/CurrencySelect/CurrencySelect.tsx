import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { Mods } from '@/shared/lib/classNames/classNames';
import { ListBox, SelectOptions } from '@/shared/ui';

import { Currency } from '../../model/consts/consts';

import classes from './CurrencySelect.module.scss';

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
            <ListBox
                items={options}
                value={value}
                onChange={handleChange}
                className={classNames('', mods, [className])}
                readonly={readonly}
                defaultValue={t('Select your currency')}
                label={t('Select your currency')}
            />
        );
    },
);
