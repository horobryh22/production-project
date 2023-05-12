import { ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getCanEdit } from '../../model/selectors/getCanEdit/getCanEdit';

import {
    profileActions,
    selectProfileError,
    selectProfileReadonly,
    updateUserProfile,
} from 'features/EditableProfileCard';
import { classNames, useAppDispatch } from 'shared/lib';
import { Button, ButtonTheme, HStack } from 'shared/ui';
import { Text } from 'shared/ui/Text/Text';

interface ProfilePageHeaderProps {
    id?: string;
    className?: string;
}

export const ProfilePageHeader = ({
    id,
    className,
}: ProfilePageHeaderProps): ReactElement => {
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();

    const readonly = useSelector(selectProfileReadonly);
    const error = useSelector(selectProfileError);
    const canEdit = useSelector(getCanEdit);

    const onEdit = useCallback((): void => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback((): void => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback((): void => {
        if (id) {
            dispatch(updateUserProfile(id));
        }
    }, [dispatch, id]);

    return (
        <HStack justify={'between'} max className={classNames('', {}, [className])}>
            <Text title={t('Profile page', { ns: 'profile' })} />
            {canEdit && (
                <>
                    {readonly && (
                        <Button data-testid={'ProfilePageButton.Edit'} onClick={onEdit}>
                            {t('Edit', { ns: 'profile' })}
                        </Button>
                    )}
                    {!readonly && !error && (
                        <HStack gap={'16'}>
                            <Button
                                onClick={onSave}
                                data-testid={'ProfilePageButton.Save'}
                            >
                                {t('Save', { ns: 'profile' })}
                            </Button>
                            <Button
                                onClick={onCancelEdit}
                                theme={ButtonTheme.OUTLINE_RED}
                                data-testid={'ProfilePageButton.Cancel'}
                            >
                                {t('Cancel', { ns: 'profile' })}
                            </Button>
                        </HStack>
                    )}
                </>
            )}
        </HStack>
    );
};
