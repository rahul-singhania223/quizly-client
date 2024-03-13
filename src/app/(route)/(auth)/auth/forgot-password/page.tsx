"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { server } from "@/constants";
import Loader from "@/components/model/loader";
import { forgotPassword } from "@/actions/user";

const formSchema = z.object({
  email: z.string().min(1),
  newPassword: z.string().min(6).max(20),
  confirmPassword: z.string().min(6).max(20),
});

type FormValueType = z.infer<typeof formSchema>;

const ForgotPasswordPage = () => {
  const form = useForm<FormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: FormValueType) => {
    try {
      setLoading(true);

      const response = await forgotPassword(data);

      router.push(`/auth/verify?action=change-password&email=${data.email}`);
    } catch (error: any) {
      console.log("FORGOT_PASSWORD_ERROR", error);

      const errorMessage = error.response.data || "Something went wrong";

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
    <MaxWidthWrapper>
      <div className="h-full w-full flex items-center justify-center p-3">
        <div className="w-full">
          <h2 className="text-xl font-medium mb-12  ">Forgot password</h2>
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                disabled={loading}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: rahul123@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={loading}
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input placeholder="New password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loading} className="w-full mt-6">
                {loading ? <Loader /> : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ForgotPasswordPage;
