"use client";

import { cn } from "@/lib/utils";
import { Nav } from "@/types";
import { Flame, Heart, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems: Nav[] = [
    {
      title: "Home",
      icon: <Home size={22} />,
      active: pathname === "/",
      href: "/",
    },
    {
      title: "Trending",
      icon: <Flame size={22} />,
      active: pathname === "/trending",
      href: "/trending",
    },
    {
      title: "Saved",
      icon: <Heart size={22} />,
      active: pathname === "/me/saved",
      href: "/me/saved",
    },
  ];

  return (
    <div className="hidden lg:block fixed top-[15%] w-fit">
      <div className="flex flex-col items-center gap-9 ">
        {navItems.map((nav) => (
          <Link
            className={cn(
              "flex flex-col items-center text-xs text-muted-foreground gap-1 hover:bg-gray-500/30 p-3 rounded-lg",
              nav.active && "text-white font-semibold"
            )}
            href={nav.href}
            key={nav.href}
          >
            {nav.icon && nav.icon}
            {nav.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
