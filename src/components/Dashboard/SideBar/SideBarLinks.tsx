// import {
//   FileText,
//   LayoutDashboard,
//   LineChart,
//   PlusCircle,
//   Settings,
//   FileStack,
//   House,
//   Notebook,
//   NotepadText,
//   MessageCircle,
//   FileUp,
// } from "lucide-react";

// export const SidebarLinks = [
//   {
//     section: "Main",
//     items: [
//       { label: "Quick Create", icon: PlusCircle, href: "#", active: true },
//       { label: "Home", icon: House, href: "/" },
//       { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
//       { label: "Analytics", icon: LineChart, href: "#" },
//     ],
//   },
//   {
//     section: "Projects",
//     items: [
//       { label: "Projects", icon: FileStack, href: "/dashboard/projects" },
//       {
//         label: "Create Project",
//         icon: FileUp,
//         href: "/dashboard/projects/create",
//       },
//     ],
//   },
//   {
//     section: "Blogs",
//     items: [
//       { label: "Blogs", icon: Notebook, href: "/dashboard/blogs" },
//       {
//         label: "Create Blog",
//         icon: NotepadText,
//         href: "/dashboard/blogs/create",
//       },
//     ],
//   },
//   {
//     section: "Message",
//     items: [
//       {
//         label: "Messages",
//         icon: MessageCircle,
//         href: "/dashboard/messages",
//       },
//     ],
//   },
//   {
//     section: "Resume",
//     items: [
//       {
//         label: "Update",
//         icon: FileText,
//         href: "/dashboard/resume",
//       },
//     ],
//   },
//   {
//     section: "Settings",
//     items: [{ label: "Settings", icon: Settings, href: "#" }],
//   },
// ];

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
            { label: "Home", href: "/dashboard/home", icon: LayoutDashboard },
            {
              label: "Profile",
              href: "/dashboard/profile",
              icon: PersonStanding,
            },
          ],
        },
        {
          section: "Manage",
          items: [
            { label: "All Users", href: "/dashboard/all-user", icon: Users },
            {
              label: "All Properties",
              href: "/dashboard/all-listings",
              icon: HomeIcon,
            },
            {
              label: "All Bookings",
              href: "/dashboard/all-bookings",
              icon: ShoppingCart,
            },
            {
              label: "All Reviews",
              href: "/dashboard/all-reviews",
              icon: Star,
            },
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
              label: "Profile",
              href: "/dashboard/user/profile",
              icon: PersonStanding,
            },
          ],
        },
        {
          section: "My Activity",
          items: [
            {
              label: "My Listings",
              href: "/dashboard/user/listings",
              icon: HomeIcon,
            },
            {
              label: "My Bookings",
              href: "/dashboard/user/bookings",
              icon: ShoppingCart,
            },
            {
              label: "My Reviews",
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
