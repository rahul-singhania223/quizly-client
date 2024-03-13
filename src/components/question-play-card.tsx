import { updateHistoryByQuizId } from "@/actions/history";
import { cn } from "@/lib/utils";
import { Question } from "@/types";
import React, { useState } from "react";
import PageLoader from "./page-loader";
import { Card, CardContent } from "./ui/card";

interface QuestionPlayCardProps {
  question: Question;
  questionCount: number;
  onAnswerSelect: (isCorrectAnswer: boolean) => void;
  loading: boolean;
}

const QuestionPlayCard: React.FC<QuestionPlayCardProps> = ({
  question,
  onAnswerSelect,
  loading,
}) => {
  const options = question.options.split(" ");

  const [selected, setSelected] = useState(false);

  const handleAnswerSelect = async (e: any, selectedAnswer: string) => {
    e.stopPropagation();

    e.target.classList.add("bg-red-600/20", "border-red-500");

    setSelected(true);

    const isCorrectAnswer = selectedAnswer === question.answer;

    onAnswerSelect(isCorrectAnswer);
  };

  if (!question) return <PageLoader />;

  return (
    <Card className="h-full border-none relative">
      <CardContent className="w-full p-0 border-none h-full flex flex-col justify-between ">
        <div className="overflow-y-auto">
          <h2 className="">{question.title}</h2>
          <p className="text-muted-foreground text-right text-xs pt-2">
            {question.exams}
          </p>
        </div>

        <div className="space-y-5 lg:relative">
          {options.map((option, index) => (
            <div
              onClick={(e) =>
                !selected && !loading ? handleAnswerSelect(e, option) : null
              }
              key={index}
              className={cn(
                "border h-14 flex items-center rounded-lg pl-6",
                option === question.answer &&
                  selected &&
                  "border-green-500 bg-green-600/30"
              )}
            >
              {option}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionPlayCard;
