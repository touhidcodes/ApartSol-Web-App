export type TFlat = {
  id: string;
  image: string;
  title: String;
  squareFeet: number;
  totalBedrooms: number;
  totalRooms: number;
  amenities: string;
  location: string;
  description: string;
  rent: number;
  availability: boolean;
  advanceAmount: number;
};

// Assuming you also have a Booking type defined
type Booking = {
  id: string;
  flatId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
