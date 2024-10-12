"use client";

import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie"; // Import js-cookie
import { authKey } from "@/constants/authKey";

interface DecodedData extends JwtPayload {
  role?: string;
}

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<DecodedData | string>("");

  useEffect(() => {
    const fetchUserInfo = () => {
      const authToken = Cookies.get(authKey);

      if (authToken) {
        const decodedData: DecodedData = jwtDecode<DecodedData>(authToken);

        const userInfo: DecodedData = {
          ...decodedData,
          role: decodedData?.role || "",
        };

        setUserInfo(userInfo);
      } else {
        setUserInfo("");
      }
    };

    fetchUserInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;
