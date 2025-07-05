import { TProperty } from "../Property";
import { TUser } from "../User";

export type TBooking = {
  id: string;
  propertyId: string;
  property: TProperty;
  userId: string;
  user: TUser;
  status: BookingStatus;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export enum BookingStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
