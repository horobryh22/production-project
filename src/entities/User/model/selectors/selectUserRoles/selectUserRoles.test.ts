import { UserRole } from '../../types';

import { isUserAdmin, isUserManager, selectUserRoles } from './selectUserRoles';

import { StateSchema } from 'app/providers/StoreProvider';

const roles: UserRole[] = [UserRole.ADMIN, UserRole.MANAGER];

describe('selectUserRoles', () => {
    test('should return user roles', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    roles,
                },
            },
        };

        expect(selectUserRoles(state as StateSchema)).toEqual(roles);
    });

    test('should return correct boolean flag', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    roles: [UserRole.ADMIN],
                },
            },
        };

        expect(isUserAdmin(state as StateSchema)).toBeTruthy();
        expect(isUserManager(state as StateSchema)).toBeFalsy();
    });
});
