import { memo, ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { Country } from '../model/types';

import classes from './CountrySelect.module.scss';

import { classNames } from 'shared/lib';
import { Mods } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui';
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
            <ListBox
                items={options}
                value={value}
                onChange={handleChange}
                className={classNames('', mods, [className])}
                readonly={readonly}
                defaultValue={t('Select your country')}
                label={t('Select your country')}
                direction={'top left'}
            />
        );
    },
);
