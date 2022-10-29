import React, { ReactElement } from 'react';

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

import { EditableProfileCard, profileReducer } from 'features/EditableProfileCard';
import { useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = (): ReactElement => {
    useDynamicModuleLoader(INITIAL_REDUCERS);

    return (
        <div>
            <ProfilePageHeader />
            <EditableProfileCard />
        </div>
    );
};

export default ProfilePage;
