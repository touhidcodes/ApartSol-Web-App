export type TBlog = {
  id: string;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
};
