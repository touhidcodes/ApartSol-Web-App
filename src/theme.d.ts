// src/theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    navItem: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    navItem?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    navItem: true;
  }
}
