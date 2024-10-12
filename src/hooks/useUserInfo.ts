// "use client";

// import { jwtDecode, JwtPayload } from "jwt-decode";
// import { authKey } from "@/constants/authKey";
// import { getCookie } from "@/utils/nextCookies";

// const useUserInfo = async () => {
//   const authToken = await getCookie(authKey);

//   if (authToken) {
//     const decodedData: JwtPayload & { role: any } = jwtDecode(
//       authToken.value
//     ) as JwtPayload & {
//       role: any;
//     };

//     return {
//       ...decodedData,
//       role: decodedData.role || "",
//     };
//   }
//   return authToken;
// };

// export default useUserInfo;

"use client";

import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie"; // Import js-cookie
import { authKey } from "@/constants/authKey";

interface DecodedData extends JwtPayload {
  role?: string;
}

const useUserInfo = () => {
  const authToken = Cookies.get(authKey); // Get the cookie using js-cookie
  console.log(authToken);

  if (authToken) {
    const decodedData: DecodedData = jwtDecode<DecodedData>(authToken);

    return {
      ...decodedData,
      role: decodedData.role || "",
    };
  }

  return null; // Return null if no token found
};

export default useUserInfo;
