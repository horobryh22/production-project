import { ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import classes from './ProfilePageHeader.module.scss';

import {
    profileActions,
    selectProfileReadonly,
    updateUserProfile,
} from 'features/EditableProfileCard';
import { classNames, useAppDispatch } from 'shared/lib';
import { Button, ButtonTheme } from 'shared/ui';
import { Text } from 'shared/ui/Text/Text';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({
    className,
}: ProfilePageHeaderProps): ReactElement => {
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();

    const readonly = useSelector(selectProfileReadonly);

    const onEdit = useCallback((): void => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback((): void => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback((): void => {
        dispatch(updateUserProfile());
    }, [dispatch]);

    return (
        <div className={classNames(classes.ProfilePageHeader, {}, [className])}>
            <Text title={t('Profile page', { ns: 'profile' })} />
            {readonly ? (
                <Button className={classes.editBtn} onClick={onEdit}>
                    {t('Edit', { ns: 'profile' })}
                </Button>
            ) : (
                <div>
                    <Button onClick={onSave} className={classes.saveBtn}>
                        {t('Save', { ns: 'profile' })}
                    </Button>
                    <Button onClick={onCancelEdit} theme={ButtonTheme.OUTLINE_RED}>
                        {t('Cancel', { ns: 'profile' })}
                    </Button>
                </div>
            )}
        </div>
    );
};
