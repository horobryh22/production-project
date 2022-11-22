import React, { ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

import { EditableProfileCard } from 'features/EditableProfileCard';
import { Page } from 'shared/ui';

const ProfilePage = (): ReactElement => {
    const { id } = useParams();

    return (
        <Page>
            <ProfilePageHeader />
            <EditableProfileCard profileId={id} />
        </Page>
    );
};

export default ProfilePage;
