import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
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
        };
        accessToken: string;
    }

    interface User {
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
}

declare module "next-auth/jwt" {
    interface JWT {
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
        accessToken: string;
    }
}