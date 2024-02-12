import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { Profile } from '../../model/types';

import classes from './ProfileCard.module.scss';

import { CountrySelect, Country } from '@/entities/Country';
import { CurrencySelect, Currency } from '@/entities/Currency';
import { classNames } from '@/shared/lib';
import { Mods } from '@/shared/lib/classNames/classNames';
import { Avatar, HStack, Input, Loader, VStack } from '@/shared/ui';
import { Text, TextAlign, TextTheme } from '@/shared/ui';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps): ReactElement => {
    const {
        error,
        isLoading,
        data,
        className,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeCity,
        onChangeUsername,
        onChangeAge,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;

    const { t } = useTranslation('profile');

    const mods: Mods = {
        [classes.editing]: !readonly,
    };

    if (isLoading) {
        return (
            <HStack
                max
                className={classNames(classes.ProfileCard, {}, [classes.loading])}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack max className={classNames(classes.ProfileCard, {}, [classes.error])}>
                <Text
                    title={t('Loading profile finished with mistake', { ns: 'profile' })}
                    text={t('Try to reload page', { ns: 'profile' })}
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    return (
        <VStack
            gap={'8'}
            max
            className={classNames(classes.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify={'center'} max>
                    <Avatar src={data.avatar} />
                </HStack>
            )}
            <Input
                value={data?.first}
                placeholder={t('Name', { ns: 'profile' })}
                readonly={readonly}
                onChange={onChangeFirstname}
                data-testid={'EditableProfileCard.Firstname'}
            />
            <Input
                value={data?.lastname}
                placeholder={t('Surname', { ns: 'profile' })}
                readonly={readonly}
                onChange={onChangeLastname}
                data-testid={'EditableProfileCard.Lastname'}
            />
            <Input
                value={data?.username}
                placeholder={t('Username', { ns: 'profile' })}
                readonly={readonly}
                onChange={onChangeUsername}
            />
            <Input
                value={data?.age}
                placeholder={t('Age', { ns: 'profile' })}
                readonly={readonly}
                onChange={onChangeAge}
            />
            <Input
                value={data?.city}
                placeholder={t('City', { ns: 'profile' })}
                readonly={readonly}
                onChange={onChangeCity}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Avatar', { ns: 'profile' })}
                readonly={readonly}
                onChange={onChangeAvatar}
            />
            <CurrencySelect
                value={data?.currency}
                readonly={readonly}
                onChange={onChangeCurrency}
            />
            <CountrySelect
                value={data?.country}
                readonly={readonly}
                onChange={onChangeCountry}
            />
        </VStack>
    );
};
