export type TUserWithProfile = {
  id: string;
  email: string;
  role: string;
  username: string;
  userId: string;
  name: string | null;
  gender: string | null;
  age: string | null;
  image: string | null;
  bio: string | null;
  profession: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  id: string;
  email: string;
  role: string;
  username: string;
  status: string;
};
