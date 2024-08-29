import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0B1134CC",
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
          background: "#234DD3",
          padding: "8px 26px",
          color: "#fff",
          fontWeight: "700",
          fontSize: "16px",
          borderRadius: "8px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#00026E",
          },
        },
        outlined: {
          padding: "8px 26px",
          background: "#0B1134CC",
          color: "#00026E",
          fontWeight: "700",
          fontSize: "16px",
          borderRadius: "8px",
          textTransform: "none",
          border: "2px solid #00026E",
          "&:hover": {
            backgroundColor: "#234DD3",
            color: "#fff",
            border: "2px solid #234DD3",
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
