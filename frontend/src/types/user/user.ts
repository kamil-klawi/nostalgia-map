import { Memory } from "@/types/memory/memory";

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    avatarUrl?: string,
    bio?: string,
    isVerified: boolean,
    memories?: Memory[],
    createdAt: Date,
    updatedAt: Date,
}