import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import Link from "next/link";
import { useState } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import AuthLoading from "../Loading/AuthLoading";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = useUserInfo();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    await logoutUser();
    router.push("/login");
  };

  if (isLoggingOut) {
    return <AuthLoading />;
  }

  return (
    <>
      {userInfo ? (
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
