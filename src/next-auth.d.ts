import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      name: string | null;
      bio: string | null;
      email: string;
      phone: string | null;
      role: $Enums.Role;
      verified: boolean;
      blocked: boolean;
      emailVerified: Date | null;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
  }
}
