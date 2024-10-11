import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import Link from "next/link";
import useUserLoggedIn from "@/hooks/useUserLoggedIn";

const AuthButton = () => {
  const router = useRouter();

  const userRole = useUserLoggedIn();

  const handleLogOut = () => {
    logoutUser(router);
    router.refresh();
  };

  return (
    <>
      {userRole ? (
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
