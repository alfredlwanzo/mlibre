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
