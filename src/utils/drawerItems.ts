import { DrawerItem, UserRole } from "@/types";

//icons

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { USER_ROLE } from "@/constants/role";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenus = [
    {
      title: "Profile",
      path: `profile`,
      icon: PersonIcon,
    },
    {
      title: "Change Password",
      path: `change-password`,
      icon: KeyIcon,
    },
  ];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "All Users",
          path: `all-user`,
          icon: SupervisedUserCircleIcon,
        },
        {
          title: "All Posts",
          path: `all-posts`,
          icon: HomeWorkIcon,
        },
        {
          title: "All Bookings",
          path: `all-bookings`,
          icon: ShoppingCartIcon,
        }
      );
      break;

    case USER_ROLE.USER:
      roleMenus.push(
        {
          title: "My Posts",
          path: `my-posts`,
          icon: HomeWorkIcon,
        },
        {
          title: "My Bookings",
          path: `my-bookings`,
          icon: ShoppingCartIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...defaultMenus, ...roleMenus];
};
