import { UserRole } from "../enums";

export interface TReview {
  id: string;
  name: string;
  email: string;
  rating: string; // consider number if you convert it
  comment: string;
  createdAt: string;
  updatedAt: string;
  propertyId?: string | null;
}

export type TReviewWithUser = {
  id: string;
  name: string;
  email: string;
  rating: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    email: string;
    role: UserRole;
    UserProfile?: {
      image?: string | null;
      name?: string;
    };
  };
  property: {
    title: string;
  };
};
