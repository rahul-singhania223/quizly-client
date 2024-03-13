"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Loader from "@/components/model/loader";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { registerWithEmail } from "@/actions/user";

const formSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(20, { message: "Name should have maximum 20 characters" }),
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

const SignUpForm = () => {
  const form = useForm<FormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleSubmit = async (data: FormValueType) => {
    try {
      setLoading(true);

      const response = await registerWithEmail(data);

      if (response.data.success) {
        router.push(`/auth/verify?email=${data.email}&action=sign-up`);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data || error.message;

      toast({
        title: "Oops!",
        description: errorMessage,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. Rahul singhania" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button disabled={loading} className="w-full" type="submit">
          {loading ? <Loader /> : "Submit"}
        </Button>

        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?
          <Link
            className="ml-2 text-primary cursor-pointer hover:underline"
            href={loading ? "#" : "/auth/sign-in"}
          >
            Log in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
