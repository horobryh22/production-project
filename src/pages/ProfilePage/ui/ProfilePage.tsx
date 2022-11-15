import React, { ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

import { EditableProfileCard } from 'features/EditableProfileCard';

const ProfilePage = (): ReactElement => {
    const { id } = useParams();

    return (
        <div>
            <ProfilePageHeader />
            <EditableProfileCard profileId={id} />
        </div>
    );
};

export default ProfilePage;
