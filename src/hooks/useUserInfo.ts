"use client";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { authKey } from "@/constants/authKey";
import { getCookie } from "@/utils/nextCookies";

const useUserInfo = async () => {
  const authToken = await getCookie(authKey);

  if (authToken) {
    const decodedData: JwtPayload & { role: any } = jwtDecode(
      authToken.value
    ) as JwtPayload & {
      role: any;
    };

    return {
      ...decodedData,
      role: decodedData.role || "",
    };
  }
  return authToken;
};

export default useUserInfo;
