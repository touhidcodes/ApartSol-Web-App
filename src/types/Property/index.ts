export type TPropertyString = {
  id: string;
  image: string;
  title: String;
  squareFeet: string;
  totalBedrooms: string;
  totalRooms: string;
  amenities: string;
  location: string;
  description: string;
  rent: string;
  availability: string;
  advanceAmount: string;
};

// Assuming you also have a Booking type defined
type Booking = {
  id: string;
  PropertyId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

// Basic Property fields
export interface TProperty {
  id: string;
  title: string;
  images: string[];
  squareFeet: number;
  totalRooms: number;
  totalBedrooms: number;
  totalBathrooms: number;
  propertyType: "RESIDENTIAL" | "COMMERCIAL";
  purpose: "RENT" | "SALE";
  street?: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  description: string;
  amenities: string[];
  availability: boolean;
  rent: number;
  advanceAmount: number;
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// UserProfile fields (nullable if not present)
export interface TUserProfile {
  id: string;
  userId: string;
  name?: string | null;
  image?: string | null;
  bio?: string | null;
  profession?: string | null;
  company?: string | null;
  licenseNumber?: string | null;
  phone?: string | null;
  secondaryPhone?: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  website?: string | null;
  socialLinks: string[];
  experience?: number | null;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Review fields
export interface TReview {
  id: string;
  name: string;
  email: string;
  rating: string;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  PropertyId?: string | null;
}

// The combined Property with nested UserProfile and Reviews
export interface TPropertyWithUserAndReviews extends TProperty {
  user: {
    UserProfile: TUserProfile | null;
  };
  review: TReview[];
}
