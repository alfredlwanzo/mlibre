export type TagType = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  published: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export type UserType = {
  id: number;
  name: string;
  bio: string;
  email: string;
  avatar: string | null;
  role: RoleType;
  verified: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export type RoleType = "subscriber" | "author" | "editor" | "admin" | "owner";
