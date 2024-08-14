import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import useUserInfo from "@/hooks/useUserInfo";
import Link from "next/link";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = useUserInfo();

  const handleLogOut = () => {
    logoutUser(router);
    router.refresh();
  };

  return (
    <>
      {userInfo?.userId ? (
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
