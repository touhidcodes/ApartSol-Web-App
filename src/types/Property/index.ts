import { PropertyType, Purpose } from "../enums";
import { TReview } from "../Review";
import { TUserWithProfile } from "../User";

export interface TProperty {
  id: string;
  title: string;
  images: string[];
  squareFeet: number;
  totalRooms: number;
  totalBedrooms: number;
  totalBathrooms: number;
  propertyType: PropertyType;
  purpose: Purpose;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  description: string;
  amenities: string[];
  availability: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  rent: number;
  advanceAmount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TPropertyWithUser extends TProperty {
  user: TUserWithProfile;
}
export interface TPropertyWithUserAndReviews extends TProperty {
  user: TUserWithProfile;
  review: TReview[];
}
