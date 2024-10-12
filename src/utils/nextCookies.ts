"use server";

import { cookies } from "next/headers";

const cookieStore = cookies();

// Function to set a cookie
export const setCookie = async (key: string, value: string) => {
  if (!key && !value) {
    return "";
  }

  cookieStore.set(key, value);
};

// Function to get a cookie
export const getCookie = async (key: string) => {
  if (!key) {
    return "";
  }
  const authToken = cookieStore.get(key);
  // console.log(authToken?.value);
  return authToken;
};

// Function to remove a cookie
export const removeCookie = (keys: string[]) => {
  if (!keys) {
    return "";
  }
  keys.forEach((key) => {
    cookieStore.delete(key);
  });
};
