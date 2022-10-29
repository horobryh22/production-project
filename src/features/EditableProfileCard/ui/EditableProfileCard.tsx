import { ReactElement, useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { selectProfileError } from '../model/selectors/selectProfileError/selectProfileError';
import { selectProfileFormData } from '../model/selectors/selectProfileFormData/selectProfileFormData';
import { selectProfileIsLoading } from '../model/selectors/selectProfileIsLoading/selectProfileIsLoading';
import { selectProfileReadonly } from '../model/selectors/selectProfileReadonly/selectProfileReadonly';
import { fetchProfileData } from '../model/services/fetchProfileData';
import { profileActions, profileReducer } from '../model/slice/profileSlice';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';
import { classNames, useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer,
};

interface EditableProfileCardProps {
    className?: string;
}

export const EditableProfileCard = ({
    className,
}: EditableProfileCardProps): ReactElement => {
    const dispatch = useAppDispatch();

    const formData = useSelector(selectProfileFormData);
    const isLoading = useSelector(selectProfileIsLoading);
    const error = useSelector(selectProfileError);
    const readonly = useSelector(selectProfileReadonly);

    useDynamicModuleLoader(INITIAL_REDUCERS);

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

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

    return (
        <div className={classNames('', {}, [className])}>
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
        </div>
    );
};
