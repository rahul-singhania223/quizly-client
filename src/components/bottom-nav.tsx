"use client";

import { usePathname } from "next/navigation";
import { Flame, Heart, Home, Plus, User } from "lucide-react";

import { Nav } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const BottomNav = () => {
  const pathname = usePathname();

  const navItems: Nav[] = [
    {
      title: "Home",
      icon: <Home size={20} />,
      active: pathname === "/",
      href: "/",
    },
    {
      title: "Trending",
      icon: <Flame size={20} />,
      active: pathname === "/trending",
      href: "/trending",
    },
    {
      title: "Add",
      icon: <Plus size={25} />,
      active: pathname === "/quizes/create",
      href: "/quizes/create",
      highlight: true,
    },
    {
      title: "Saved",
      icon: <Heart size={20} />,
      active: pathname === "/me/saved",
      href: "/me/saved",
    },
    {
      title: "Me",
      icon: <User size={20} />,
      active: pathname === "/me",
      href: "/me",
    },
  ];

  return (
    <div className="bg-background z-30 p-2 py-3 w-full fixed bottom-0 left-0 right-0 lg:hidden">
      <div className="w-full grid grid-cols-5 gap-4">
        {navItems.map((nav) => (
          <Link
            href={nav.href}
            key={nav.title}
            className={cn(
              "flex flex-col items-center text-xs gap-1",
              nav.active
                ? "text-black font-semibold dark:text-white"
                : "text-muted-foreground",
              nav.highlight
                ? "bg-primary text-white flex items-center justify-center rounded-full"
                : ""
            )}
          >
            {nav.icon}
            {!nav.highlight && `${nav.title}`}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
