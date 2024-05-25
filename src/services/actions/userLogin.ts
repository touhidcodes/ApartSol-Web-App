// "use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/authKey";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
    // cache: "no-store",
  });
  const userInfo = await res.json();

  //   const passwordChangeRequired = userInfo.data.needPasswordChange;

  if (userInfo.data.token) {
    // setAccessToken(userInfo.data.token, {
    //   redirect: "/dashboard",
    //   //   passwordChangeRequired,
    // });
    setToLocalStorage(authKey, userInfo.data.token);
  }

  return userInfo;
};
