export interface CreateUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatarUrl?: string,
    bio?: string,
}