import Link from "next/link";
import { Typography, Button, Box } from "@mui/material";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const color = pathname === "/" ? "#FFF" : "#00026E";

  return (
    <Link href={href} passHref>
      <Box
        sx={{
          color: color,
          fontWeight: isActive ? "bold" : "normal",
          borderBottom: isActive ? "2px solid #00026E" : "none",
          paddingBottom: "4px",
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        {isActive ? (
          <Button variant="contained" size="small">
            {children}
          </Button>
        ) : (
          <Typography variant="navItem" sx={{ color: color }}>
            {children}
          </Typography>
        )}
      </Box>
    </Link>
  );
};

export default ActiveLink;
