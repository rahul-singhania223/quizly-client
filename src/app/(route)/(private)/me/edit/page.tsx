"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ImageUpload from "@/components/image-upload";
import Loader from "@/components/model/loader";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { server } from "@/constants";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/actions/user";

const formSchema = z.object({
  name: z.string().min(1).max(25),
  bio: z.string().min(1).max(100),
  imageUrl: z.string(),
  is_private: z.boolean(),
});

type FormValueType = z.infer<typeof formSchema>;

const EditProfilePage = () => {
  const { name, bio, is_private, image_url } = useUser().user as User;

  const form = useForm<FormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      bio,
      imageUrl: image_url ? image_url : "",
      is_private,
    },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValueType) => {
    try {
      setLoading(true);

      const response = await updateProfile(data);

      toast({
        title: "Profile updated",
      });

      location.href = "/me";
    } catch (error: any) {
      console.log("[couldn't update profile]", error);
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
    <MaxWidthWrapper>
      <PageHeader title="Edit Profile" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"space-y-6 my-5"}
        >
          <FormField
            disabled={loading}
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => field.onChange("")}
                    disabled={loading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            disabled={loading}
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Rahul Singhania" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={loading}
            name="bio"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="eg. I'm the greatest engineer of the world"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={loading}
            name="is_private"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="space-y-3 p-4 border w-fit border-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <FormLabel>Private Account</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>

                  <FormDescription>
                    Your profile will not be visible to others
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="w-full md:w-fit" type="submit">
            {loading ? <Loader /> : "Submit"}
          </Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default EditProfilePage;
