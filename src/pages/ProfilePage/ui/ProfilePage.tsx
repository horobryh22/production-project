import React, { lazy, ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/EditableProfileCard';
import { LazyLoader, VStack } from '@/shared/ui';
import { Page } from '@/widgets/Page';

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

// lazy
const ProfileRating = lazy(() => import('@/features/ProfileRating'));

const ProfilePage = (): ReactElement => {
    let { id } = useParams();

    if (__PROJECT__ === 'jest') id = '1';

    return (
        <Page>
            <VStack gap={'16'} max>
                <ProfilePageHeader id={id} />
                <EditableProfileCard profileId={id} />
                <LazyLoader initialInView>
                    <ProfileRating profileId={id!} />
                </LazyLoader>
            </VStack>
        </Page>
    );
};

export default ProfilePage;
