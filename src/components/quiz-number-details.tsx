"use client";

import React, { useEffect, useState } from "react";
import { Heart, MoreVertical, Share, Users } from "lucide-react";

import { cn, numberFormatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Quiz } from "@/types";
import { useUser } from "@/hooks/use-user";
import { useToast } from "./ui/use-toast";
import { saveQuiz, unsaveQuiz } from "@/actions/saved";
import { useShare } from "@/hooks/use-share-model";
import { usePathname } from "next/navigation";

interface NumberDetailsProps {
  likes: number;
  questions: number;
  plays: number;
  quiz: Quiz;
}

const NumberDetails: React.FC<NumberDetailsProps> = ({
  likes,
  questions,
  plays,
  quiz,
}) => {
  const { user } = useUser();
  const { onOpen } = useShare();

  const [isSaved, setIsSaved] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (user?.saved_quizes && quiz) {
      const savedQuiz = user.saved_quizes.find(
        (saved) => saved.quiz_id === quiz.id
      );

      if (savedQuiz) {
        setIsSaved(true);
      }
    }
  }, [user, quiz]);

  const { toast } = useToast();

  const successMessage = isSaved ? "Unsaved one quiz" : "Saved one quiz";
  const errorMessage = isSaved ? "Couldn't unsave quiz" : "Coudln't save quiz";

  const handleSaveOrUnsave = async () => {
    try {
      if (isSaved) {
        const response = await unsaveQuiz(quiz.id);
        setIsSaved(false);
      } else {
        const response = await saveQuiz(quiz.id);
        setIsSaved(true);
      }

      toast({
        title: successMessage,
      });
    } catch (error: any) {
      console.log("[Couldn't save or unsave quiz]", error);
      toast({
        title: "Oops!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full items-center gap-5 text-xs text-muted-foreground pt-2">
      <span className="">{questions} questions</span>
      <div className="flex items-center gap-2 flex-1">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Heart size={13} />
          {numberFormatter.format(likes)}
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Users size={13} />
          {numberFormatter.format(plays)}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="p-1 h-6 ml-auto block">
              <MoreVertical size={15} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-none w-fit">
            <DropdownMenuItem>
              <Button
                onClick={quiz && handleSaveOrUnsave}
                variant={"ghost"}
                className="text-sm text-muted-foreground flex items-center gap-2 h-fit p-0"
              >
                <Heart
                  className={cn("", isSaved ? "fill-muted-foreground" : "")}
                  size={14}
                />
                <span>{isSaved ? "Unsave" : "Save"}</span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => onOpen(quiz)}
                variant={"ghost"}
                className="text-sm text-muted-foreground flex items-center gap-2 h-fit p-0"
              >
                <Share size={14} />
                <span>Share</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NumberDetails;
