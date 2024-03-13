"use client";

import { redirect } from "next/navigation";
import React from "react";

import PageLoader from "@/components/page-loader";
import { useUser } from "@/hooks/use-user";
import Footer from "@/components/footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useUser();

  if (status === "LOADING") {
    return <PageLoader />;
  }

  if (status === "AUTHENTICATED") {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-full md:max-w-screen-sm lg:max-w-none mx-auto">
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
