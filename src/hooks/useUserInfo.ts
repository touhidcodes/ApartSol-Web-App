// "use client";

// import { useState, useEffect } from "react";
// import { jwtDecode, JwtPayload } from "jwt-decode";
// import { authKey } from "@/constants/authKey";
// import { getCookie } from "@/utils/nextCookies";

// type DecodedUser = JwtPayload & { role?: string };

// const useUserInfo = () => {
//   const [user, setUser] = useState<DecodedUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const authToken = await getCookie(authKey);
//         console.log(authToken);

//         if (authToken) {
//           const decoded = jwtDecode(authToken.value) as DecodedUser;
//           setUser({
//             ...decoded,
//             role: decoded.role || "",
//           });
//         } else {
//           setUser(null);
//         }
//       } catch (err) {
//         console.error("Failed to decode token", err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   return { user, loading };
// };

// export default useUserInfo;

"use client";

import { getCurrentUser } from "@/services/actions/getCurrentUser";
import { useState, useEffect } from "react";

export const useUserInfo = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const result = await getCurrentUser();
      setUser(result);
      setLoading(false);
    };
    loadUser();
  }, []);

  return { user, loading };
};
