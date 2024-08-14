import Link from "next/link";
import { Typography, Button, Box } from "@mui/material";
import { ReactNode } from "react";
import { usePathname } from "next/navigation"; // Use usePathname

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ href, children }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <Box
        sx={{
          color: isActive ? "primary.main" : "inherit",
          fontWeight: isActive ? "bold" : "normal",
          borderBottom: isActive ? "2px solid #00026E" : "none",
          paddingBottom: "4px",
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        {isActive ? (
          <Button variant="contained" size="small">
            {children}
          </Button>
        ) : (
          <Typography variant="navItem" sx={{ color: "#00026E" }}>
            {children}
          </Typography>
        )}
      </Box>
    </Link>
  );
};

export default ActiveLink;
