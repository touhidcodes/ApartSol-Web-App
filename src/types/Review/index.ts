export type TReview = {
  id: string;
  rating: string;
  comment: string;
  user: {
    username: string;
    email: string;
  };
  flat: {
    title: string;
    location: string;
  };
};
