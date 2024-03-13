"use client";

import {
  CreditCard,
  LogOut,
  User as UserIcon,
  Settings,
  UserCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/actions/user";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types";
import React from "react";

interface UserButtonProps {
  user: User | null;
}

export const UserButton: React.FC<UserButtonProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href={"/me"}>
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-green-700">
            {user?.image_url ? (
              <Image src={user.image_url} alt="avatar" fill />
            ) : (
              <span>{user?.name.slice(0, 1)}</span>
            )}
          </div>
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="flex" href={"/me"}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-400">
          <Button
            onClick={logOut}
            className="w-full justify-start p-0"
            variant={"ghost"}
          >
            {" "}
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
