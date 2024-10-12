import { authKey } from "@/constants/authKey";
import { removeCookie } from "@/utils/nextCookies";

export const logoutUser = () => {
  // localStorage.removeItem(authKey);
  // localStorage.removeItem("refreshToken");
  removeCookie([authKey, "refreshToken"]);
  window.location.reload();
};
