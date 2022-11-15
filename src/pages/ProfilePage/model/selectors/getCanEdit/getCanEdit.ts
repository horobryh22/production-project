import { createSelector } from 'reselect';

import { selectAuthData } from 'entities/User';
import { selectProfileFormData } from 'features/EditableProfileCard';

export const getCanEdit = createSelector(
    selectAuthData,
    selectProfileFormData,
    (authData, profileData) => authData.id === profileData?.id,
);
