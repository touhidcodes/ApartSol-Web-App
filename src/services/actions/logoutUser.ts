import { authKey } from "@/constants/authKey";
import Cookies from "js-cookie";

export const logoutUser = () => {
  Cookies.remove(authKey);
  Cookies.remove("refreshToken");
  window.location.reload();
};
