import { getQuizById, getQuizByIdWithQuestions } from "@/actions/quiz";
import PageHeader from "@/components/page-header";
import PageLoader from "@/components/page-loader";
import QuestionCard from "@/components/question-card";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Quiz } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const QuizDetailsPage = async ({ params }: { params: { quizId: string } }) => {
  const quizId = params.quizId;

  const quiz = (await getQuizByIdWithQuestions(quizId)) as Quiz;

  if (!quiz) return <PageLoader />;

  return (
    <MaxWidthWrapper>
      <PageHeader title="Quiz details" />

      <div className="my-4">
        <h2 className="text-lg font-semibold">{quiz.title}</h2>
        <p className="text-sm text-muted-foreground">{quiz.description}</p>
        <Link href={`/quizes/${quizId}/edit`}>
          <Button className="mt-6" variant={"outline"}>
            Edit quiz
          </Button>
        </Link>
      </div>

      <div className="my-5">
        <h2 className="text-lg font-semibold">
          Questions ({quiz.questionCount})
        </h2>

        <div className="mt-6 space-y-5">
          {quiz.questions.map((question) => (
            <QuestionCard key={question.id} quiz_id={quizId} {...question} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default QuizDetailsPage;
