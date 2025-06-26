import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#EBF0F4",
        color: "#00026E",
      }}
    >
      Loading...
    </Box>
  );
};

export default Loading;
