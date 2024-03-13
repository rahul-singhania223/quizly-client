"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

interface ScoreModelProps {
  score: number;
  questionCount: number;
  open: boolean;
  onClose: () => void;
  restart: () => void;
}

const ScoreModel: React.FC<ScoreModelProps> = ({
  onClose,
  open,
  score,
  restart,
  questionCount,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 hidden items-center justify-center z-20 bg-black/10 dark:bg-background/60",
        open ? "flex" : "hidden"
      )}
    >
      <div className="w-full max-w-md aspect-video border rounded-lg bg-background flex items-center justify-center flex-col">
        <span className="mb-2">Your Score</span>
        <span className="text-2xl font-bold">
          {score} / {questionCount}
        </span>
        <div className="flex gap-7 mt-8">
          <Button onClick={onClose} variant={"outline"}>
            Finish
          </Button>
          <Button onClick={restart}>Play again</Button>
        </div>
      </div>
    </div>
  );
};

export default ScoreModel;
