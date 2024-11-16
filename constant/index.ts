import {
  LucideIcon,
  User,
  ShoppingBag,
  BookOpen,
  FilePenLine,
  MessageCircle,
  Sparkles,
  Gift,
  LayoutDashboard,
} from "lucide-react";

export const EDITIONS: string[] = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
  "29th",
  "30th",
];

type UserSidebarNavs = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const userSidebarNavs: UserSidebarNavs[] = [
  {
    label: "Profile",
    href: "/user/profile",
    icon: User,
  },
  {
    label: "Orders",
    href: "/user/orders",
    icon: ShoppingBag,
  },
  {
    label: "Reviews",
    href: "/user/reviews",
    icon: FilePenLine,
  },
  {
    label: "Questions",
    href: "/user/questions",
    icon: MessageCircle,
  },
  {
    label: "Points",
    href: "/user/points",
    icon: Sparkles,
  },
];

type SellerSidebarNavs = {
  href: string;
  label: string;
  icon: LucideIcon;
  isHome?: boolean;
};

export const sellerSidebarNavs: SellerSidebarNavs[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    isHome: true,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
];
