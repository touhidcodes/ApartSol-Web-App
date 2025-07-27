import { authKey } from "@/constants/authKey";
import { removeCookie } from "@/utils/nextCookies";

export const logoutUser = () => {
  removeCookie(authKey);
  removeCookie("refreshToken");
  window.location.reload();
};
