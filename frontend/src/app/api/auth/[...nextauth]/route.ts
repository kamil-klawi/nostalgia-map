import NextAuth, {Session, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {JWT} from "next-auth/jwt";
import {AdapterUser} from "next-auth/adapters";
import {Login, LoginResponse} from "@/types/auth/login";
import axios from "axios";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials?: Partial<Login>) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const res = await axios.post("http://localhost:3000/api/auth/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const data: LoginResponse = res.data();
                    if (data.accessToken) {
                        return {
                            ...data.currentUser,
                            accessToken: data.accessToken
                        }
                    }

                    return null;
                } catch (error) {
                    console.error("Axios error in authorize: ", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt" as const,
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({token, user}: { token: JWT, user: User | AdapterUser }) {
            if (user) {
                const customUser = user as User & { accessToken?: string };
                token.id = customUser.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.email = user.email;
                token.avatarUrl = user.avatarUrl;
                token.bio = user.bio;
                token.isVerified = user.isVerified;
                token.memories = user.memories;
                token.createdAt = user.createdAt;
                token.updatedAt = user.updatedAt;
                token.accessToken = (user as any).accessToken;
            }

            return token;
        },
        async session({session, token}: { session: Session, token: JWT }) {
            session.user = {
                id: token.id,
                firstName: token.firstName,
                lastName: token.lastName,
                email: token.email,
                avatarUrl: token.avatarUrl,
                bio: token.bio,
                isVerified: token.isVerified,
                memories: token.memories,
                createdAt: token.createdAt,
                updatedAt: token.updatedAt,
            };
            session.accessToken = token.accessToken;
            return session;
        },
    }
});

export const { GET, POST } = handler;