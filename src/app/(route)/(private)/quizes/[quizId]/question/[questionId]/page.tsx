import { getQuestionById } from "@/actions/question";
import PageHeader from "@/components/page-header";
import QuestionForm from "@/components/question-form";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Separator } from "@/components/ui/separator";

const AddQuestionPage = async ({
  params,
}: {
  params: { questionId: string; quizId: string };
}) => {
  const { questionId, quizId } = params;

  const question = await getQuestionById(quizId, questionId);

  return (
    <MaxWidthWrapper>
      <PageHeader title="Create question" />
      <Separator />

      <QuestionForm initialData={question || null} />
    </MaxWidthWrapper>
  );
};

export default AddQuestionPage;
