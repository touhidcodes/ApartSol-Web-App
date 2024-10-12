import { Box, CircularProgress } from "@mui/material";

const AuthLoading = () => {
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
      <CircularProgress size={60} thickness={3} />
    </Box>
  );
};

export default AuthLoading;
