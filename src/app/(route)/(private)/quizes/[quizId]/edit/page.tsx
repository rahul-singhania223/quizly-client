import { getQuizById } from "@/actions/quiz";
import PageHeader from "@/components/page-header";
import QuizForm from "@/components/quiz-form";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

const EditQuizPage = async ({ params }: { params: { quizId: string } }) => {
  const quizId = params.quizId;

  const quiz = await getQuizById(quizId);

  return (
    <MaxWidthWrapper className="">
      <PageHeader title="Edit quiz" />
      <QuizForm initialData={quiz} />
    </MaxWidthWrapper>
  );
};

export default EditQuizPage;
