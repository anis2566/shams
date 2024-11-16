import {
  LayoutGrid,
  LucideIcon,
  List,
  Layers3,
  BookOpen,
  MessageCircleQuestion,
  PlusCircle,
  BookOpenCheck,
  MessageCircleWarning,
  UserPen,
  Book,
  CalendarArrowUp,
  GalleryVertical,
  Users,
  Radio,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getAdminMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Main",
      menus: [
        {
          href: "",
          label: "Authors",
          active: pathname.includes("/dashboard/authors"),
          icon: UserPen,
          submenus: [
            {
              href: "/dashboard/authors/new",
              label: "New",
              active: pathname === "/dashboard/authors/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/authors",
              label: "List",
              active: pathname === "/dashboard/authors",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Categories",
          active: pathname.includes("/dashboard/categories"),
          icon: Layers3,
          submenus: [
            {
              href: "/dashboard/categories/new",
              label: "New",
              active: pathname === "/dashboard/categories/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/categories",
              label: "List",
              active: pathname === "/dashboard/categories",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Publications",
          active: pathname.includes("/dashboard/publications"),
          icon: BookOpenCheck,
          submenus: [
            {
              href: "/dashboard/publications/new",
              label: "New",
              active: pathname === "/dashboard/publications/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/publications",
              label: "List",
              active: pathname === "/dashboard/publications",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Books",
          active: pathname.includes("/dashboard/books"),
          icon: Book,
          submenus: [
            {
              href: "/dashboard/books/new",
              label: "New",
              active: pathname === "/dashboard/books/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/books",
              label: "List",
              active: pathname === "/dashboard/books",
              icon: List,
            },
          ],
        },
        {
          href: "/dashboard/orders",
          label: "Orders",
          active: pathname.includes("/dashboard/orders"),
          icon: CalendarArrowUp,
          submenus: [],
        },
        {
          href: "/dashboard/reviews",
          label: "Reviews",
          active: pathname.includes("/dashboard/reviews"),
          icon: MessageCircleWarning,
          submenus: [],
        },
        {
          href: "/dashboard/questions",
          label: "Questions",
          active: pathname.includes("/dashboard/questions"),
          icon: MessageCircleQuestion,
          submenus: [],
        },
        {
          href: "",
          label: "Banners",
          active: pathname.includes("/dashboard/banners"),
          icon: GalleryVertical,
          submenus: [
            {
              href: "/dashboard/banners/new",
              label: "New",
              active: pathname === "/dashboard/banners/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/banners",
              label: "List",
              active: pathname === "/dashboard/banners",
              icon: List,
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Seller",
      menus: [
        {
          href: "",
          label: "Seller",
          active: pathname === "/admin/seller",
          icon: Users,
          submenus: [
            {
              href: "/dashboard/seller/new",
              label: "New",
              active: pathname === "/dashboard/seller/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/seller/request",
              label: "Request",
              active: pathname === "/dashboard/seller/request",
              icon: Radio,
            },
            {
              href: "/dashboard/seller",
              label: "List",
              active: pathname === "/dashboard/seller",
              icon: List,
            },
          ],
        },
      ],
    },
  ];
}

export function getSellerMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/seller",
          label: "Dashboard",
          active: pathname === "/seller",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Main",
      menus: [
        {
          href: "",
          label: "Books",
          active: pathname.includes("/seller/books"),
          icon: BookOpen,
          submenus: [
            {
              href: "/seller/books/new",
              label: "New",
              active: pathname === "/seller/books/new",
              icon: PlusCircle,
            },
            {
              href: "/seller/books",
              label: "List",
              active: pathname === "/seller/books",
              icon: List,
            },
          ],
        },
        {
          href: "/seller/orders",
          label: "Orders",
          active: pathname.includes("/seller/orders"),
          icon: CalendarArrowUp,
          submenus: [],
        },
        {
          href: "/seller/reviews",
          label: "Reviews",
          active: pathname.includes("/seller/reviews"),
          icon: MessageCircleWarning,
          submenus: [],
        },
        {
          href: "/seller/questions",
          label: "Questions",
          active: pathname.includes("/seller/questions"),
          icon: MessageCircleQuestion,
          submenus: [],
        },
      ],
    },
  ];
}
