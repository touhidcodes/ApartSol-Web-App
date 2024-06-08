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
        outlined: {
          padding: "12px 30px",
          background: "#FFF8F4",
          color: "#ff793f",
          fontWeight: "700",
          fontSize: "16px",
          borderRadius: "10px",
          textTransform: "none",
          border: "2px solid #ff793f",
          "&:hover": {
            backgroundColor: "#ff5722",
            color: "#fff",
            border: "2px solid #ff5722",
          },
        },
        text: {
          padding: "12px 30px",
          background: "#fff",
          color: "#ff793f",
          fontWeight: "700",
          fontSize: "16px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#fff",
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
  typography: {
    navItem: {
      fontWeight: 700,
      fontSize: "18px",
      color: "#0B1134CC",
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";
