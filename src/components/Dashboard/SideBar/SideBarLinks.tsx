import {
  Home,
  PersonStanding,
  HomeIcon,
  ShoppingCart,
  MessageCircle,
  FileText,
  LayoutDashboard,
  Users,
  Star,
  KeyRound,
} from "lucide-react";

import { USER_ROLE } from "@/constants/role";
import { UserRole } from "@/types";

// Type definition for the sidebar item
type SidebarGroup = {
  section: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
};

export const getSidebarLinks = (role: UserRole): SidebarGroup[] => {
  const defaultItems = [
    {
      section: "Profile",
      items: [
        {
          label: "Profile",
          href: "/dashboard/profile",
          icon: PersonStanding,
        },
      ],
    },
    {
      section: "Settings",
      items: [
        {
          label: "Change Password",
          href: "/dashboard/change-password",
          icon: KeyRound,
        },
      ],
    },
  ];

  switch (role) {
    case USER_ROLE.ADMIN:
      return [
        {
          section: "Main",
          items: [
            {
              label: "Home",
              href: "/dashboard/admin/overview",
              icon: LayoutDashboard,
            },
          ],
        },
        {
          section: "Manage",
          items: [
            {
              label: "Property Listings",
              href: "/dashboard/admin/listings",
              icon: HomeIcon,
            },
            {
              label: "Bookings",
              href: "/dashboard/admin/bookings",
              icon: ShoppingCart,
            },
            {
              label: "Reviews",
              href: "/dashboard/admin/reviews",
              icon: Star,
            },
            { label: "Users", href: "/dashboard/admin/users", icon: Users },
          ],
        },
        ...defaultItems,
      ];

    case USER_ROLE.USER:
      return [
        {
          section: "Main",
          items: [
            {
              label: "Home",
              href: "/dashboard/user/overview",
              icon: LayoutDashboard,
            },
          ],
        },
        {
          section: "My Activity",
          items: [
            {
              label: "Property Listings",
              href: "/dashboard/user/listings",
              icon: HomeIcon,
            },
            {
              label: "Bookings",
              href: "/dashboard/user/bookings",
              icon: ShoppingCart,
            },
            {
              label: "Reviews",
              href: "/dashboard/user/reviews",
              icon: Star,
            },
          ],
        },
        ...defaultItems,
      ];

    default:
      return defaultItems;
  }
};
