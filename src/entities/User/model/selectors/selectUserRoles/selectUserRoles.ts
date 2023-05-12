import { createSelector } from 'reselect';

import { UserRole } from '../../types';

import { StateSchema } from 'app/providers/StoreProvider';

export const selectUserRoles = (state: StateSchema) => state.user?.authData?.roles;

export const isUserAdmin = createSelector(selectUserRoles, roles =>
    roles?.includes(UserRole.ADMIN),
);

export const isUserManager = createSelector(selectUserRoles, roles =>
    roles?.includes(UserRole.MANAGER),
);
