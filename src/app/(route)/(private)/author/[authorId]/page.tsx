import { getAuthorById } from "@/actions/author";
import AuthorCard from "@/components/author-card";
import PageLoader from "@/components/page-loader";
import QuizCard from "@/components/quiz-card";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Separator } from "@/components/ui/separator";

import { User } from "@/types";

const AuthorPage = async ({ params }: { params: { authorId: string } }) => {
  const authorId = params.authorId;

  const author = (await getAuthorById(authorId)) as Partial<User>;

  if (!author) return <PageLoader />;

  return (
    <MaxWidthWrapper>
      <section>
        <AuthorCard author={author} />
        <Separator />
      </section>

      <section className="my-5">
        <h2 className="text-2xl font-bold">Quizes</h2>
        <p className="text-muted-foreground text-sm">
          All quizes from {author.name}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
          {author.quizes?.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default AuthorPage;
