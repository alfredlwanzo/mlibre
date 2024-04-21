
export type AppType={
  id: number;
  title: string;
  description: string;
  language: LanguageType;
  status: AppStatusType;
  createdAt: Date;
  updatedAt: Date;
}

export type AppStatusType = "online" | "offline" | "maintenance";
export type LanguageType = "fr" | "en";

export type TagType = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  published: boolean;
  verified: boolean;
  articles?: ArticleTagType[];
  createdAt: Date;
  updatedAt: Date;
};
export type UserType = {
  id: number;
  username: string;
  name: string;
  bio: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: RoleType;
  verified: boolean;
  blocked: boolean;
  articles?: ArticleType[];
  createdAt: Date;
  updatedAt: Date;
};
export type RoleType = "subscriber" | "author" | "editor" | "admin" | "owner";

export type ArticleType = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  markdown: string;
  imageUrl: string;
  authorId: number;
  author?: UserType;
  year: number;
  published: boolean;
  commentable: boolean;
  verified: boolean;
  blocked: boolean;
  tags?: ArticleTagType[];
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleTagType = {
  articleId: number;
  article?: ArticleType;
  tagId: number;
  tag?: TagType;
};
