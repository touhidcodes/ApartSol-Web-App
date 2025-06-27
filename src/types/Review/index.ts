export type TReview = {
  id: string;
  rating: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    email: string;
    role: "SUPERADMIN" | "ADMIN" | "AGENT" | "USER";
    UserProfile?: {
      image?: string | null;
      name?: string;
    };
  };
  flat: {
    title: string;
    location: string;
  };
};
