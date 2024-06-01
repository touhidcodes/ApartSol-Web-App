type TFlatBookings = {
  title: string;
  location: string;
  rent: number;
};

export type TBookings = {
  id: string;
  flat: TFlatBookings;
  flatId: string;
  status: string;
  userId: string;
};
