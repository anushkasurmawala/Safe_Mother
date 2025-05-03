export interface AuthError {
    code: string;
    message: string;
}

export type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
};

export type AuthResponse = 
    { success: true; user: User; message?: never } 
    | { success: false; message: string; user?: never };

export interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}
