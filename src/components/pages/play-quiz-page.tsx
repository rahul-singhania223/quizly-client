"use client";

import { getQuestionsByQuizId } from "@/actions/question";
import { Question } from "@/types";
import React, { useEffect, useState } from "react";
import PageLoader from "../page-loader";
import PlayCarousel from "../play-carousel";

interface PlayQuizPageComponetProps {
  quizId: string;
}

const PlayQuizPageComponet: React.FC<PlayQuizPageComponetProps> = ({
  quizId,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQuestionsData = async () => {
      try {
        setLoading(true);

        const data = await getQuestionsByQuizId(quizId, true);

        setQuestions(data);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId && questions.length === 0) {
      getQuestionsData();
    }
  }, [quizId, questions]);

  if (loading) return <PageLoader />;

  return (
    <div className="">
      <PlayCarousel quiz_id={quizId} questions={questions} />
    </div>
  );
};

export default PlayQuizPageComponet;
