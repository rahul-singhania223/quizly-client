"use client";

import React from "react";

import BottomNav from "@/components/bottom-nav";
import Sidebar from "@/components/sidebar";
import { useUser } from "@/hooks/use-user";
import { redirect, usePathname } from "next/navigation";
import PageLoader from "@/components/page-loader";
import LandingPageLoader from "@/components/landing-page-loader";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  // const { status } = useUser();

  // const pathname = usePathname();

  // if (status === "UNAUTHENTICATED") return redirect("/auth");

  // if (pathname === "/" && status === "LOADING") return <LandingPageLoader />;
  // if (status === "LOADING") return <PageLoader />;

  return (
    <div className="flex">
      <div className="hidden lg:block h-full w-[80px]" />
      <Sidebar />
      {children}
      <BottomNav />
    </div>
  );
};

export default HomeLayout;
