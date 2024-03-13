"use client";

import { useEffect, useState } from "react";

import { getQuestionsByQuizId } from "@/actions/question";
import PageLoader from "@/components/page-loader";
import PlayCarousel from "@/components/play-carousel";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Question } from "@/types";
import Loader from "@/components/model/loader";

const PlayQuizPage = ({ params }: { params: { quizId: string } }) => {
  const quizId = params.quizId;

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
    <MaxWidthWrapper>
      <div className="">
        <PlayCarousel quiz_id={quizId} questions={questions} />
      </div>
    </MaxWidthWrapper>
  );
};

export default PlayQuizPage;
