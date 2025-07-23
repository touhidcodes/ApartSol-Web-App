import { USER_ROLE } from "@/constants/role";

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type UserRole = keyof typeof USER_ROLE;

export type TUserRegister = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export interface TPaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  start: number;
  end: number;
}
