import { Box, List, Stack } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SideBarItem from "./SideBarItem";
import useUserInfo from "@/hooks/useUserInfo";

const SideBar = () => {
  const user = useUserInfo();
  const userRole = user?.role || "";

  return (
    <Box style={{ height: "100vh" }}>
      <Stack
        sx={{
          py: 1,
          mt: 1,
          cursor: "pointer",
        }}
        direction="row"
        alignItems="center"
        justifyContent="center"
        component={Link}
        href="/"
      >
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Image src={assets.images.logo} alt="logo" width={50} height={50} />
        </Box>
        <Box px={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <Image src={assets.images.text2} alt="logo" width={200} height={50} />
        </Box>
      </Stack>
      <List sx={{ paddingLeft: "20px" }}>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SideBarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
