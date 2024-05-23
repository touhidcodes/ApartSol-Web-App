import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFF8F4",
    },
    secondary: {
      main: "#FF6725",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          background: "#ff793f",
          padding: "12px 30px",
          color: "#fff",
          fontWeight: "700",
          fontSize: "16px",
          borderRadius: "10px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#ff5722",
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});
