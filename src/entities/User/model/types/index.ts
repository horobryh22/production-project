export interface User {
    id: string;
    username: string;
}

export interface UserSchema {
    authData: User;
    isUserAuth: boolean;
    _initialized: boolean;
}
