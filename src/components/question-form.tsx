"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

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
import { useToast } from "@/components/ui/use-toast";
import { server } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import { Question } from "@prisma/client";
import { createNewQuestion, updateQuestion } from "@/actions/question";
import Loader from "./model/loader";

interface QuestionFormProps {
  initialData?: Question;
}

const formSchema = z.object({
  title: z.string().min(1),
  options: z.string().min(1),
  answer: z.string().min(1),
  exams: z.string(),
});

type FormValueType = z.infer<typeof formSchema>;

const QuestionForm: React.FC<QuestionFormProps> = ({ initialData }) => {
  const form = useForm<FormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          title: "",
          options: "",
          answer: "",
          exams: "",
        },
  });

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const { quizId } = useParams();

  const successMessage = initialData ? "Question updated" : "Question created";
  const errorMessage = initialData
    ? "Couldn't update question"
    : "Couldn't create question";

  const onSubmit = async (data: FormValueType) => {
    try {
      setLoading(true);

      if (!initialData) {
        const response = await createNewQuestion(quizId.toString(), data);
      }

      if (initialData) {
        const response = await updateQuestion(
          quizId.toString(),
          initialData.id,
          data
        );
      }

      toast({
        title: successMessage,
      });
    } catch (error: any) {
      console.log("[Couldn't create quiz]", error);
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
      <form
        className="space-y-6 my-5 overflow-auto px-2 mt-10 sm:mt-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          disabled={loading}
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg. mathematics quiz question?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={loading}
          name="options"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Options</FormLabel>
              <FormControl>
                <Input placeholder="eg. 45 | 56 | 23 | 34" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={loading}
          name="answer"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Input placeholder="eg. 23" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={loading}
          name="exams"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exams</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg. SCC cgl | MTS | Bihar police"
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

export default QuestionForm;
