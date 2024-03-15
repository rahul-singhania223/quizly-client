"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { server } from "@/constants";

import Loader from "@/components/model/loader";
import { loginWithEmail } from "@/actions/user";

const formSchema = z.object({
  email: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Invalid email address",
    }),
  password: z
    .string()
    .min(6, { message: "Password should have minimum 6 characters" })
    .max(20, { message: "Password should have maximum 20 characters" }),
});

type FormValueType = z.infer<typeof formSchema>;

const SignInForm = () => {
  const form = useForm<FormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (data: FormValueType) => {
    try {
      setLoading(true);

      const response = await loginWithEmail(data);

      toast({
        title: "Great job!",
        description: "Authenticated successfully",
      });

      // location.href = "/";
    } catch (error: any) {
      toast({
        title: "Oops!",
        description: error?.response?.data || error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-6"}>
        <FormField
          disabled={loading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="eg. rahul123@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={loading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="eg. strong password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Link
          href={loading ? "" : "/auth/forgot-password"}
          className="text-primary block text-right cursor-pointer text w-fit ml-auto"
        >
          Forgot password?
        </Link>

        <Button disabled={loading} className="w-full" type="submit">
          {loading ? <Loader /> : "Submit"}
        </Button>

        <p className="mt-6 text-sm text-center text-gray-400">
          Not have an account?
          <Link
            className="ml-2 text-primary cursor-pointer hover:underline"
            href={loading ? "" : "/auth/sign-up"}
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
