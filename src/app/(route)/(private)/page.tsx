import Avatar from "@/components/avatar";
import HomeCarousel from "@/components/home-carousel";
import QuizCard from "@/components/quiz-card";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Quiz, User } from "@/types";
import { getFeedQuizes, getTopQuizes } from "@/actions/quiz";
import { getTopAuthors } from "@/actions/author";

const HomePage = async () => {
  const quizes = (await getFeedQuizes()) as Quiz[];

  const topAuthors = (await getTopAuthors()) as User[];

  const topQuizes = (await getTopQuizes()) as Quiz[];

  return (
    <MaxWidthWrapper>
      <section className="">
        <HomeCarousel quizes={topQuizes} />
      </section>

      {topAuthors && (
        <section className="py-8">
          <h2 className="text-lg font-semibold">Top authors</h2>
          <div className="flex scroll-smooth scrollbar-w-none flex-nowrap overflow-auto items-center gap-8 overflow-x-auto mt-7">
            {topAuthors.map((author) => (
              <>
                <div>
                  {author && (
                    <Avatar
                      author={author}
                      className="w-16 h-16"
                      imageUrl={author.image_url}
                    />
                  )}
                </div>
              </>
            ))}
          </div>
        </section>
      )}

      <section className="py-6">
        <h2 className="text-lg font-semibold">Top quizes</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-5 lg:grid-cols-3">
          {quizes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default HomePage;
