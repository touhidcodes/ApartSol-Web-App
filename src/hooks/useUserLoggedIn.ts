"use client";

import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { authKey } from "@/constants/authKey";
import { getCookie } from "@/utils/nextCookies";

interface DecodedToken extends JwtPayload {
  role?: string;
}

const useUserLoggedIn = (): string | null => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const authToken = await getCookie(authKey); // Fetch the auth token from cookies

      if (authToken) {
        try {
          const decodedData: DecodedToken = jwtDecode(
            authToken?.value
          ) as DecodedToken;

          console.log(decodedData); // Optional: Log decoded data for debugging

          // If decoding is successful and a role is found, update the role state
          if (decodedData.role) {
            setRole(decodedData.role);
          } else {
            setRole(null); // No role found, set role to null
          }
        } catch (error) {
          // If there's an error decoding the token, set role to null
          console.error("Error decoding token", error);
          setRole(null);
        }
      } else {
        // No auth token found, user is not logged in
        setRole(null);
      }
    };

    checkUserRole(); // Call the function to check the user's role
  }, []); // The effect runs only once when the component mounts

  return role; // Return the user's role or null if not logged in
};

export default useUserLoggedIn;
