import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { DrawerItem } from "@/types";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
};

const SideBarItem = ({ item }: IProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathname = usePathname();

  console.log({ pathname, linkPath });
  return (
    <Link href={linkPath}>
      <ListItem
        disablePadding
        sx={{
          ...(pathname === linkPath
            ? {
                borderRight: "5px solid #ff793f",
                "& svg": {
                  color: "#ff793f",
                },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideBarItem;
