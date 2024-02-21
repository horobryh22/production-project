import { ReactElement, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from '@/entities/Profile';
import { useAppDispatch, useDynamicModuleLoader, useInitialEffect } from '@/shared/lib';
import { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { VStack, Text, TextTheme } from '@/shared/ui';

import { ValidateProfileError } from '../model/consts/consts';
import { selectProfileError } from '../model/selectors/selectProfileError/selectProfileError';
import { selectProfileFormData } from '../model/selectors/selectProfileFormData/selectProfileFormData';
import { selectProfileIsLoading } from '../model/selectors/selectProfileIsLoading/selectProfileIsLoading';
import { selectProfileReadonly } from '../model/selectors/selectProfileReadonly/selectProfileReadonly';
import { selectProfileValidateErrors } from '../model/selectors/selectProfileValidateErrors/selectProfileValidateErrors';
import { fetchProfileData } from '../model/services/fetchProfileData/fetchProfileData';
import { useProfileActions, profileReducer } from '../model/slice/profileSlice';

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
    const { changeUserProfile } = useProfileActions();

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
            changeUserProfile({ first: value });
        },
        [changeUserProfile],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            changeUserProfile({ lastname: value });
        },
        [changeUserProfile],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            if (!/\D/g.test(value || '')) {
                changeUserProfile({ age: Number(value || 0) });
            }
        },
        [changeUserProfile],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            changeUserProfile({ city: value });
        },
        [changeUserProfile],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            changeUserProfile({ username: value });
        },
        [changeUserProfile],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            changeUserProfile({ avatar: value });
        },
        [changeUserProfile],
    );

    const onChangeCurrency = useCallback(
        (value: Currency) => {
            changeUserProfile({ currency: value });
        },
        [changeUserProfile],
    );

    const onChangeCountry = useCallback(
        (value: Country) => {
            changeUserProfile({ country: value });
        },
        [changeUserProfile],
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
