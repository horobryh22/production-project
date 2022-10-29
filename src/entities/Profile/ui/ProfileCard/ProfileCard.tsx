import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { Profile } from '../../model/types';

import classes from './ProfileCard.module.scss';

import { classNames } from 'shared/lib';
import { Mods } from 'shared/lib/classNames/classNames';
import { Avatar, Input, Loader } from 'shared/ui';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';

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
    } = props;

    const { t } = useTranslation('profile');

    const mods: Mods = {
        [classes.editing]: !readonly,
    };

    if (isLoading) {
        return (
            <div className={classNames(classes.ProfileCard, {}, [classes.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(classes.ProfileCard, {}, [classes.error])}>
                <Text
                    title={t('Loading profile finished with mistake', { ns: 'profile' })}
                    text={t('Try to reload page', { ns: 'profile' })}
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    return (
        <div className={classNames(classes.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <div className={classes.avatarWrapper}>
                    <Avatar src={data.avatar} />
                </div>
            )}
            <Input
                value={data?.first}
                placeholder={t('Name', { ns: 'profile' })}
                className={classes.input}
                readonly={readonly}
                onChange={onChangeFirstname}
            />
            <Input
                value={data?.lastname}
                placeholder={t('Surname', { ns: 'profile' })}
                className={classes.input}
                readonly={readonly}
                onChange={onChangeLastname}
            />
            <Input
                value={data?.username}
                placeholder={t('Username', { ns: 'profile' })}
                className={classes.input}
                readonly={readonly}
                onChange={onChangeUsername}
            />
            <Input
                value={data?.age}
                placeholder={t('Age', { ns: 'profile' })}
                className={classes.input}
                readonly={readonly}
                onChange={onChangeAge}
            />
            <Input
                value={data?.city}
                placeholder={t('City', { ns: 'profile' })}
                className={classes.input}
                readonly={readonly}
                onChange={onChangeCity}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Avatar', { ns: 'profile' })}
                className={classes.input}
                readonly={readonly}
                onChange={onChangeAvatar}
            />
        </div>
    );
};
