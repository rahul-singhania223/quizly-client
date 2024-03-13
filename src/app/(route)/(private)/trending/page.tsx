import { getTrendingQuizes } from "@/actions/quiz";
import PageHeader from "@/components/page-header";
import QuizCard from "@/components/quiz-card";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Quiz } from "@/types";

const TrendingPage = async () => {
  const quizes = (await getTrendingQuizes()) as Quiz[];

  return (
    <MaxWidthWrapper>
      <PageHeader title="Trending quizes" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {quizes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default TrendingPage;
