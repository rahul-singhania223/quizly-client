"use client";

import React, { useEffect, useState } from "react";
import {
  Edit,
  Heart,
  Loader2,
  MoreVertical,
  Plus,
  Share,
  Trash,
  Users,
} from "lucide-react";

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
import { usePathname, useRouter } from "next/navigation";
import Loader from "./model/loader";
import { deleteQuizById } from "@/actions/quiz";
import { useAlert } from "@/hooks/use-alert";

interface NumberDetailsProps {
  likes: number;
  questions: number;
  plays: number;
  quiz: Quiz;
  type?: "PERSONAL" | "OTHERS";
}

const NumberDetails: React.FC<NumberDetailsProps> = ({
  likes,
  questions,
  plays,
  quiz,
  type,
}) => {
  const { user, addUser } = useUser();
  const { onOpen } = useShare();

  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      if (isSaved) {
        const response = await unsaveQuiz(quiz.id);

        addUser(response.data);

        setIsSaved(false);
      } else {
        const response = await saveQuiz(quiz.id);
        setIsSaved(true);

        addUser(response.data);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center gap-5 text-muted-foreground pt-2">
      <span className="text-sm">{questions} questions</span>
      <div className="flex items-center gap-2 flex-1">
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <Heart size={13} />
          {numberFormatter.format(likes)}
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <Users size={13} />
          {numberFormatter.format(plays)}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="p-1 h-6 ml-auto block">
              <MoreVertical size={17} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-none w-fit space-y-2">
            <DropdownMenuItem className="p-0">
              <Button
                onClick={quiz && handleSaveOrUnsave}
                variant={"ghost"}
                className="text-sm text-muted-foreground relative flex items-center gap-2 h-fit p-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={15} />
                ) : (
                  <>
                    <Heart
                      className={cn("", isSaved ? "fill-muted-foreground" : "")}
                      size={16}
                    />
                    <span>{isSaved ? "Unsave" : "Save"}</span>
                  </>
                )}
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Button
                onClick={() => onOpen(quiz)}
                variant={"ghost"}
                className="text-sm p-2 text-muted-foreground flex items-center gap-2 h-fit"
              >
                <Share size={16} />
                <span>Share</span>
              </Button>
            </DropdownMenuItem>

            {/* actions for personal quiz */}

            {type === "PERSONAL" && (
              <>
                <DropdownMenuItem className="p-0">
                  <Button
                    onClick={() => {
                      router.push(`/quizes/${quiz.id}/question/new`);
                    }}
                    variant={"ghost"}
                    className="p-2 text-sm text-muted-foreground flex items-center gap-2 h-fit"
                  >
                    <Plus size={16} />
                    <span>Add question</span>
                  </Button>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-0">
                  <Button
                    onClick={() => {
                      router.push(`/quizes/${quiz.id}/edit`);
                    }}
                    variant={"ghost"}
                    className="text-sm p-2 text-muted-foreground flex items-center gap-2 h-fit"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </Button>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NumberDetails;
