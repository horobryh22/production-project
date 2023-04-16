import React, { ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

import { EditableProfileCard } from 'features/EditableProfileCard';
import { VStack } from 'shared/ui';
import { Page } from 'widgets/Page';

const ProfilePage = (): ReactElement => {
    const { id } = useParams();

    return (
        <Page>
            <VStack gap={'16'} max>
                <ProfilePageHeader />
                <EditableProfileCard profileId={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
