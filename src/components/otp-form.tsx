"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resendOTP } from "@/actions/user";
import Loader from "@/components/model/loader";

const formSchema = z.object({
  otp: z.string().min(1).max(6),
});

export type OTPFormValueType = z.infer<typeof formSchema>;

interface OTPFormProps {
  onSubmit: (value: OTPFormValueType) => void;
  loading: boolean;
}

const OTPForm: React.FC<OTPFormProps> = ({ onSubmit, loading }) => {
  const form = useForm<OTPFormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-9 p-4"
      >
        <FormField
          disabled={loading}
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <Input placeholder="6 digit OTP" {...field} />
              </FormControl>
              <p
                onClick={resendOTP}
                className="text-sm text-primary mt-4 cursor-pointer"
              >
                Resend
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-full">
          {loading ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default OTPForm;
