import { DrawerItem, UserRole } from "@/types";

//icons

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReviewsIcon from "@mui/icons-material/Reviews";
import KeyIcon from "@mui/icons-material/Key";
import { USER_ROLE } from "@/constants/role";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenus = [
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
          title: "Home",
          path: `home`,
          icon: DashboardIcon,
        },
        {
          title: "Profile",
          path: `profile`,
          icon: PersonIcon,
        },
        {
          title: "All Users",
          path: `all-user`,
          icon: SupervisedUserCircleIcon,
        },
        {
          title: "All Properties",
          path: `all-properties`,
          icon: HomeWorkIcon,
        },
        {
          title: "All Bookings",
          path: `all-bookings`,
          icon: ShoppingCartIcon,
        },
        {
          title: "All Reviews",
          path: `all-reviews`,
          icon: ReviewsIcon,
        }
      );
      break;

    case USER_ROLE.USER:
      roleMenus.push(
        {
          title: "Profile",
          path: `profile`,
          icon: PersonIcon,
        },
        {
          title: "My Properties",
          path: `my-properties`,
          icon: HomeWorkIcon,
        },
        {
          title: "My Bookings",
          path: `my-bookings`,
          icon: ShoppingCartIcon,
        },
        {
          title: "My Reviews",
          path: `my-reviews`,
          icon: ReviewsIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
