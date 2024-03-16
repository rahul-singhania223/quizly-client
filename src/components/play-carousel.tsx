import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import QuestionPlayCard from "./question-play-card";
import { Question } from "@/types";
import { resetHistory, updateHistoryByQuizId } from "@/actions/history";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Repeat, Repeat1, Repeat2, Rotate3D, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import ScoreModel from "./model/score-model";

interface PlayCarouselProps {
  questions: Question[];
  quiz_id: string;
}

const PlayCarousel: React.FC<PlayCarouselProps> = ({ questions, quiz_id }) => {
  const { toast } = useToast();

  const router = useRouter();

  const [scoreModelOpen, setScoreModelOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateHistory = async () => {
    try {
      setLoading(true);

      const response = await updateHistoryByQuizId(quiz_id);
    } catch (error: any) {
      console.log("[Couldn't update history]", error);
      toast({
        title: "Oops!",
        description: "Coudln't update history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = async () => {
    location.reload();
  };

  const onAnswerSelect = (isCorrectAnswer: boolean) => {
    setAttempted((prev) => prev + 1);

    if (isCorrectAnswer) {
      updateHistory();
      setScore((prev) => prev + 1);
    }

    if (attempted + 1 === questions.length) {
      setScoreModelOpen(true);
    }
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-4xl"
    >
      <ScoreModel
        open={scoreModelOpen}
        onClose={() => {
          location.href = "/";
        }}
        questionCount={questions.length}
        restart={restartQuiz}
        score={score}
      />

      <CarouselContent className="h-[calc(100vh-150px)] lg:h-[calc(100vh-100px)] space-y-4 w-full">
        {questions.map((question) => (
          <div key={question.id} className="min-h-full py-10 w-full">
            <QuestionPlayCard
              loading={loading}
              question={question}
              questionCount={questions.length}
              onAnswerSelect={onAnswerSelect}
            />
          </div>
        ))}
      </CarouselContent>
      <div className="hidden lg:flex -mt-2 gap-3">
        <CarouselNext className="static" />
        <CarouselPrevious className="static" />
      </div>
    </Carousel>
  );
};

export default PlayCarousel;
