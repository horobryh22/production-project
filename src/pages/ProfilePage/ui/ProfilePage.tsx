import React, { ReactElement } from 'react';

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

import { EditableProfileCard } from 'features/EditableProfileCard';

const ProfilePage = (): ReactElement => {
    return (
        <div>
            <ProfilePageHeader />
            <EditableProfileCard />
        </div>
    );
};

export default ProfilePage;
