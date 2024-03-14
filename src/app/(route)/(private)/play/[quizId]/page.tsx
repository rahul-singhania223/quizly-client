import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import PlayQuizPageComponet from "@/components/pages/play-quiz-page";
import { Metadata, ResolvingMetadata } from "next";
import { getQuizById } from "@/actions/quiz";
import { Quiz } from "@/types";

interface Props {
  params: { quizId: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const quizId = params.quizId;

  const quiz = (await getQuizById(quizId)) as Quiz;

  return {
    title: quiz.title,
    openGraph: {
      images: [quiz.thumbnail],
    },
  };
}

const PlayQuizPage = ({ params }: { params: { quizId: string } }) => {
  return (
    <>
      <MaxWidthWrapper>
        <PlayQuizPageComponet quizId={params.quizId} />
      </MaxWidthWrapper>
    </>
  );
};

export default PlayQuizPage;
