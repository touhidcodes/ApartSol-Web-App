"use client";

import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { authKey } from "@/constants/authKey";
import { getCookie } from "@/utils/nextCookies";

type DecodedUser = JwtPayload & { role?: string };

const useUserInfo = () => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = await getCookie(authKey);

        if (authToken) {
          const decoded = jwtDecode(authToken.value) as DecodedUser;
          setUser({
            ...decoded,
            role: decoded.role || "",
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to decode token", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useUserInfo;

// "use client";

// import { jwtDecode, JwtPayload } from "jwt-decode";
// import Cookies from "js-cookie";
// import { authKey } from "@/constants/authKey";

// interface DecodedData extends JwtPayload {
//   role?: string;
//   email?: string;
//   username?: string;
// }

// const useUserInfo = () => {
//   const authToken = Cookies.get(authKey);
//   console.log(authToken);

//   if (authToken) {
//     const decodedData: DecodedData = jwtDecode<DecodedData>(authToken);

//     return {
//       ...decodedData,
//       role: decodedData.role || "",
//     };
//   }

//   return null; // Return null if no token found
// };

// export default useUserInfo;
