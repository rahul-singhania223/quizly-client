"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import OTPForm from "@/components/otp-form";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { useToast } from "@/components/ui/use-toast";
import { server } from "@/constants";
import { verify } from "@/actions/user";

const VerifyPage = () => {
  const email = useSearchParams().get("email");
  const action = useSearchParams().get("action");
  // const token =

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      if (!action) return;

      setLoading(true);

      const response = await verify(action, email, data);

      if (action === "change-password") {
        toast({
          title: "Password updated",
          description: "Password changed successfully",
        });

        router.push("/auth/sign-in");
        router.refresh();
      }

      if (action === "sign-up") {
        toast({
          title: "Great job!",
          description: "You are registered now",
        });

        location.href = "/";
      }
    } catch (error: any) {
      console.log("[VERIFICATION_ERROR]", error);

      const errMessage = error.response.data || "Something went wrong";

      toast({
        title: "Oops!",
        description: errMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!email || !action) {
    return router.back();
  }

  return (
    <MaxWidthWrapper>
      <div className="flex items-center w-full h-full justify-center">
        <div className="w-full flex flex-col items-center max-w-md">
          <div className="mb-8 text-center text-slate-300">
            6 digit OTP has been sent to your email {email} .
          </div>

          <OTPForm loading={loading} onSubmit={handleSubmit} />

          <p className="text-sm text-gray-800 dark:text-gray-300 mt-8 ">
            Already have an account?{" "}
            <Link
              href={loading ? "#" : "/auth/sign-in"}
              className="text-primary cursor-pointer hover:underline ml-2"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default VerifyPage;
