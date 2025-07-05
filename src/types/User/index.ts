import { UserRole, UserStatus } from "../enums";

export interface TUserProfile {
  id: string;
  userId: string;
  name?: string | null;
  image?: string | null;
  bio?: string | null;
  profession?: string | null;
  company?: string | null;
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
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TUser {
  id: string;
  username: string;
  email: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TUserWithProfile extends TUser {
  userProfile: TUserProfile;
}
