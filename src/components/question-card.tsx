"use client";

import { deleteQuestionById } from "@/actions/question";
import { server } from "@/constants";
import { Edit, MoreVertical, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import AlertModel from "./model/alert-model";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "./ui/use-toast";

interface QuestionCardProps {
  quiz_id: string;
  title: string;
  options: string;
  answer: string;
  exams?: string;
  id: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  options,
  answer,
  exams,
  quiz_id,
  id,
}) => {
  const onDelete = async () => {
    try {
      const response = await deleteQuestionById(quiz_id, id);

      toast({
        title: "Question deleted",
      });

      location.reload();
    } catch (error: any) {
      toast({
        title: error.response?.data || "Couldn't delete question",
      });
    }
  };

  return (
    <div className="border p-4 rounded-lg flex items-center justify-between gap-4">
      <div>
        <p>{title}</p>
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs mt-2 ">
          <p>Options: {options}</p>
          <p>answer: {answer}</p>
          <p>exams: {exams}</p>
        </div>
      </div>

      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-20">
            <DropdownMenuItem>
              <Link
                className="flex items-center gap-2 h-8"
                href={`/quizes/${quiz_id}/question/${id}`}
              >
                <Edit size={15} />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Button
                onClick={onDelete}
                className="flex items-center gap-2 h-8"
                variant={"destructive"}
              >
                <Trash size={15} />
                <span>Delete</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default QuestionCard;
