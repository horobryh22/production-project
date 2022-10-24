import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectProfileData } from '../../model/selectors/selectProfileData/selectProfileData';

import classes from './ProfileCard.module.scss';

import { classNames } from 'shared/lib';
import { Button, Input } from 'shared/ui';
import { Text } from 'shared/ui/Text/Text';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps): ReactElement => {
    const { t } = useTranslation('profile');

    const data = useSelector(selectProfileData);

    return (
        <div className={classNames(classes.ProfileCard, {}, [className])}>
            <div className={classes.header}>
                <Text title={t('Profile page', { ns: 'profile' })} />
                <Button className={classes.editBtn}>
                    {t('Edit', { ns: 'profile' })}
                </Button>
            </div>
            <div className={classes.data}>
                <Input
                    value={data?.first}
                    placeholder={t('Name', { ns: 'profile' })}
                    className={classes.input}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Surname', { ns: 'profile' })}
                    className={classes.input}
                />
            </div>
        </div>
    );
};
