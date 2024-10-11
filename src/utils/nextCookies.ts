"use server";

import { cookies } from "next/headers";

// Function to set a cookie
export const setCookie = async (key: string, value: string) => {
  if (!key && !value) {
    return "";
  }
  cookies().set(key, value);
};

// Function to get a cookie
export const getCookie = async (key: string) => {
  if (!key) {
    return "";
  }
  const cookieStore = cookies();
  const authToken = cookieStore.get(key);
  console.log(authToken?.value);
  return authToken;
};

// Function to remove a cookie
export const removeCookie = async (key: string) => {
  if (!key) {
    return "";
  }

  cookies().delete(key);
};
