"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const AuthPage = () => {
  const loginWithGoogle = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUrl = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URL;
    const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIET_SECRET;

    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      "response_type=code" +
      `&client_id=${clientId}.apps.googleusercontent.com` +
      `&redirect_uri=${redirectUrl}` +
      "&scope=email%20profile";
  };

  return (
    <div className="flex flex-col justify-center items-center place-items-center gap-4 gap-y-9 lg:gap-y-0 lg:grid lg:grid-cols-2 p-2 lg:p-4 h-full">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center lg:text-left ">
          Make your exam preparation super easy with{" "}
          <span className="text-primary">quizly.</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Link href={"/auth/sign-up"} className={"w-full"}>
          <Button className="py-6 w-full">Start Now</Button>
        </Link>
        <Link href={"/auth/sign-in"} className={"w-full"}>
          <Button className="py-6 w-full" variant={"outline"}>
            Log In
          </Button>
        </Link>
        <Link href={"#"} className={"w-full"}>
          <Button
            onClick={loginWithGoogle}
            className="py-6 w-full"
            variant={"outline"}
          >
            Continue with Google
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
