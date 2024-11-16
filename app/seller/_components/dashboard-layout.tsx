"use client";

import { usePathname } from "next/navigation";
import { Role, SellerStatus, User } from "@prisma/client";

import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Sidebar } from "./sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { Pending } from "./pending";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const sidebar = useSidebar(useSidebarToggle, (state) => state);
  const pathname = usePathname();

  if (!sidebar) return null;

  const isNoLayout = pathname.includes("/seller/register");
  const isSellerPending = user.role === Role.Seller && user.status === SellerStatus.Pending;

  return (
    <>
      {!isNoLayout && !isSellerPending && <Sidebar />}
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] duration-300 ease-in-out",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64",
          isNoLayout && "lg:ml-0",
          isSellerPending && "lg:ml-0"
        )}
      >
        {
          isSellerPending ? (
            <Pending />
          ) : (
            children
          )}
      </main>
    </>
  );
}
