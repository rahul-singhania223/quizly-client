"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "./use-toast";

import { updatePlayCount } from "@/actions/play";
import { useRouter } from "next/navigation";

interface PlayButtonProps {
  quiz_id: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ quiz_id }) => {
  const router = useRouter();

  const onQuizPlay = async () => {
    try {
      // update play count & create/update history

      const response = await updatePlayCount(quiz_id);

      router.push(`/play/${quiz_id}`);
    } catch (error: any) {
      console.log("[couldn't update play count]", error);
      toast({
        title: "Oops!",
        description: "Couldn't update play count",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={onQuizPlay} className="flex items-center gap-1 px-6">
      <Play size={15} />
      Play
    </Button>
  );
};

export default PlayButton;
