import { Button, CircularProgress, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import Link from "next/link";
import { useState } from "react";
import useUserInfo from "@/hooks/useUserInfo";

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
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: -20,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          zIndex: 9999,
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  // Check if user is authenticated based on userInfo
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
