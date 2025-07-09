import { User } from "@/types/user/user";

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    currentUser: User;
}