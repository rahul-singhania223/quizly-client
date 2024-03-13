"use client";

import React, { useState } from "react";
import { Trash } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Quiz } from "@/types";
import AlertModel from "@/components/model/alert-model";
import { createNewQuiz, deleteQuizById, updateQuiz } from "@/actions/quiz";
import Loader from "@/components/model/loader";

interface QuizFormProps {
  initialData?: Quiz;
}

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  thumbnail: z.string().min(1),
});

type FormValueType = z.infer<typeof formSchema>;

const QuizForm: React.FC<QuizFormProps> = ({ initialData }) => {
  const form = useForm<FormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData }
      : { title: "", description: "", thumbnail: "" },
  });

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const successMessage = initialData
    ? "Quiz updated successfully"
    : "Quiz created successfully";
  const successDescription = initialData ? "" : "Now go add some questions";
  const failureDesctiption = initialData
    ? "Couldn't update quiz"
    : "Couldn't create quiz";

  const onSubmit = async (data: FormValueType) => {
    try {
      setLoading(true);

      if (!initialData) {
        const response = await createNewQuiz(data);

        router.push(`/quizes/${response?.data?.id}/question/new`);
      }

      if (initialData) {
        const response = await updateQuiz(data);

        router.push(`/quizes/${initialData.id}`);
      }

      router.refresh();

      toast({
        title: successMessage,
        description: successMessage,
      });
    } catch (error: any) {
      console.log("[Couldn't create quiz]", error);
      toast({
        title: "Oops!",
        description: failureDesctiption,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      if (!initialData?.id) return;

      setLoading(true);

      const response = await deleteQuizById(initialData.id);

      toast({
        title: "Deleted one quiz",
      });

      router.push("/me");
      router.refresh();
    } catch (error: any) {
      const errorMessage = error.response?.data || error.message;

      toast({
        title: "Oops!",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(true);
    }
  };

  return (
    <Form {...form}>
      {initialData && (
        <div className="flex justify-end mt-3">
          <AlertModel onDelete={onDelete}>
            <Button
              className="w-14 h-14 "
              variant={"destructive"}
              size={"icon"}
            >
              <Trash size={18} />
            </Button>
          </AlertModel>
        </div>
      )}

      <form
        className="space-y-6 my-5 overflow-auto px-2 mt-10 sm:mt-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          disabled={loading}
          name="thumbnail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <ImageUpload
                  disabled={loading}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={loading}
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="eg. mathematics quiz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={loading}
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="eg. mathematics quiz of important questions"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full py-6 -mb-10 md:w-fit" disabled={loading}>
          {loading ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default QuizForm;
