export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    termsAccepted: boolean;
}

export interface LoginInput {
    email: string;
    password: string;
}