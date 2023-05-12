export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
}

export enum UserRole {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    USER = 'USER',
}

export interface UserSchema {
    authData: User;
    isUserAuth: boolean;
    _initialized: boolean;
}
