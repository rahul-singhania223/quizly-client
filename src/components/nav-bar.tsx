"use client";

import Link from "next/link";
import { Loader2, Plus } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@/components/user-button";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { authUser } from "@/actions/user";

const Navbar = () => {
  const { addUser, changeStatus, user, status } = useUser();

  useEffect(() => {
    const getUser = async () => {
      const user = await authUser();

      if (!user) return changeStatus("UNAUTHENTICATED");

      return addUser(user);
    };

    getUser();
    // @ts-ignore
  }, []);
  return (
    <div className="w-full p-2 lg:p-4 lg:py-4 absolute top-0 left-0 right-0">
      <nav className="max-w-screen-lg mx-auto flex items-center justify-between gap-6">
        <Link className="text-lg font-semibold" href={"/"}>
          quizly.
        </Link>

        <div className="flex items-center gap-5">
          <ModeToggle />
          {status === "LOADING" && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}

          {status === "AUTHENTICATED" && (
            <>
              <Link className="hidden lg:block" href={"/quizes/create"}>
                <Button className="text-xs">
                  <Plus size={15} />
                  Create quiz
                </Button>
              </Link>

              {status === "AUTHENTICATED" && <UserButton user={user} />}
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
