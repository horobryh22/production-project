import React, { ReactElement, useEffect } from 'react';

import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile';
import { useAppDispatch, useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = (): ReactElement => {
    const dispatch = useAppDispatch();

    useDynamicModuleLoader(INITIAL_REDUCERS);

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <div>
            <ProfileCard />
        </div>
    );
};

export default ProfilePage;
