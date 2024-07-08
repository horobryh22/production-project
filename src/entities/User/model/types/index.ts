import { FeaturesFlags } from '@/shared/types/features';

import { UserRole } from '../consts/consts';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    featureFlags?: FeaturesFlags;
}

export interface UserSchema {
    authData: User;
    isUserAuth: boolean;
    _initialized: boolean;
}
