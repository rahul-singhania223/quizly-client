import PageHeader from "@/components/page-header";
import QuizForm from "@/components/quiz-form";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

const CreateQuizPage = () => {
  return (
    <MaxWidthWrapper className="">
      <PageHeader title="Create quiz" />
      <QuizForm />
    </MaxWidthWrapper>
  );
};

export default CreateQuizPage;
