import { Theme } from '@/shared/const/enums';
import { FeaturesFlags } from '@/shared/types/features';

import { UserRole } from '../consts/consts';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    featureFlags?: FeaturesFlags;
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData: User;
    isUserAuth: boolean;
    _initialized: boolean;
}

export interface JsonSettings {
    theme?: Theme;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
}
