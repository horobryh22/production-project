import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { Country } from '../model/types';

import classes from './CountrySelect.module.scss';

import { classNames } from 'shared/lib';
import { Mods } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui';
import { SelectOptions } from 'shared/ui/Select/Select';

const options: SelectOptions<Country>[] = [
    { content: Country.USA, value: Country.USA },
    { content: Country.RUSSIA, value: Country.RUSSIA },
    { content: Country.BELARUS, value: Country.BELARUS },
];

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (currency: Country) => void;
    readonly?: boolean;
}

export const CountrySelect = memo(
    ({ className, onChange, value, readonly }: CountrySelectProps): ReactElement => {
        const { t } = useTranslation();

        const handleChange = useCallback(
            (value: string) => {
                onChange?.(value as Country);
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
                label={t('Select your country')}
                options={options}
                readonly={readonly}
            />
        );
    },
);
