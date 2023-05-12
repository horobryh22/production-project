import { ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectProfileError } from '../model/selectors/selectProfileError/selectProfileError';
import { selectProfileFormData } from '../model/selectors/selectProfileFormData/selectProfileFormData';
import { selectProfileIsLoading } from '../model/selectors/selectProfileIsLoading/selectProfileIsLoading';
import { selectProfileReadonly } from '../model/selectors/selectProfileReadonly/selectProfileReadonly';
import { selectProfileValidateErrors } from '../model/selectors/selectProfileValidateErrors/selectProfileValidateErrors';
import { fetchProfileData } from '../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../model/slice/profileSlice';
import { ValidateProfileError } from '../model/types';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';
import { useAppDispatch, useDynamicModuleLoader, useInitialEffect } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { VStack } from 'shared/ui';
import { Text, TextTheme } from 'shared/ui/Text/Text';

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer,
};

interface EditableProfileCardProps {
    className?: string;
    profileId?: string;
}

export const EditableProfileCard = ({
    className,
    profileId,
}: EditableProfileCardProps): ReactElement => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation('profile');

    const formData = useSelector(selectProfileFormData);
    const isLoading = useSelector(selectProfileIsLoading);
    const error = useSelector(selectProfileError);
    const readonly = useSelector(selectProfileReadonly);
    const validateError = useSelector(selectProfileValidateErrors);

    useDynamicModuleLoader(INITIAL_REDUCERS);

    useInitialEffect(() => {
        if (profileId) {
            dispatch(fetchProfileData(profileId));
        }
    }, []);

    const onChangeFirstname = useCallback(
        (value?: string) => {
            dispatch(profileActions.changeUserProfile({ first: value }));
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            dispatch(profileActions.changeUserProfile({ lastname: value }));
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            if (!/\D/g.test(value || '')) {
                dispatch(profileActions.changeUserProfile({ age: Number(value || 0) }));
            }
        },
        [dispatch],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.changeUserProfile({ city: value }));
        },
        [dispatch],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.changeUserProfile({ username: value }));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.changeUserProfile({ avatar: value }));
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (value: Currency) => {
            dispatch(profileActions.changeUserProfile({ currency: value }));
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (value: Country) => {
            dispatch(profileActions.changeUserProfile({ country: value }));
        },
        [dispatch],
    );

    const validateErrorTranslates: Record<ValidateProfileError, string> = {
        [ValidateProfileError.INCORRECT_AGE]: t('Enter the correct age', {
            ns: 'profile',
        }),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Select your country, please', {
            ns: 'profile',
        }),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('User data is not correct', {
            ns: 'profile',
        }),
        [ValidateProfileError.SERVER_ERROR]: t('The data was not sent', {
            ns: 'profile',
        }),
        [ValidateProfileError.NO_DATA]: t('The data is empty', {
            ns: 'profile',
        }),
    };

    return (
        <VStack gap={'8'} max className={className}>
            {validateError?.length &&
                validateError.map(error => {
                    return (
                        <Text
                            key={error}
                            text={validateErrorTranslates[error]}
                            theme={TextTheme.ERROR}
                            data-testid={'EditableProfileCard.Error'}
                        />
                    );
                })}
            <ProfileCard
                data={formData}
                error={error}
                isLoading={isLoading}
                readonly={readonly}
                onChangeFirstname={onChangeFirstname}
                onChangeLastname={onChangeLastname}
                onChangeAge={onChangeAge}
                onChangeCity={onChangeCity}
                onChangeUsername={onChangeUsername}
                onChangeAvatar={onChangeAvatar}
                onChangeCurrency={onChangeCurrency}
                onChangeCountry={onChangeCountry}
            />
        </VStack>
    );
};
