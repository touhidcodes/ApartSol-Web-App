import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import useUserInfo from "@/hooks/useUserInfo";
import Link from "next/link";
import { useEffect, useState } from "react";

const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const userInfo = useUserInfo(); // This should return user info or an empty string
  console.log(userInfo);

  useEffect(() => {
    const checkUserInfo = async () => {
      const user = await userInfo; // Await the promise from useUserInfo
      console.log(user);

      if (user) {
        setIsLoggedIn(true); // Check for userId
      }
    };

    checkUserInfo();
  }, [userInfo]);

  const handleLogOut = () => {
    logoutUser(router);
    router.refresh();
  };

  return (
    <>
      {isLoggedIn ? (
        <Button variant="contained" color="primary" onClick={handleLogOut}>
          Logout
        </Button>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
