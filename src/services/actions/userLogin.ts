// "use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/authKey";
import { toast } from "sonner";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
    // cache: "no-store",
  });
  const userInfo = await res.json();

  if (userInfo.success === false) {
    toast.error(userInfo.message);
  }

  if (userInfo.data.token) {
    setToLocalStorage(authKey, userInfo.data.token);
    setAccessToken(userInfo.data.token);
  }

  return userInfo;
};
