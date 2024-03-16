"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Edit, Plus } from "lucide-react";

import { getMyHistory } from "@/actions/history";
import Avatar from "@/components/avatar";
import NumberDetails from "@/components/quiz-number-details";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import PlayButton from "@/components/ui/play-button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/use-user";
import { numberFormatter } from "@/lib/utils";
import { Quiz, User, History } from "@/types";
import Loader from "@/components/model/loader";
import { getMyQuizes } from "@/actions/quiz";
import QuizCard from "@/components/quiz-card";

const UserPage = () => {
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);

  const user = useUser().user as User;

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const quizesData = await getMyQuizes();
        const historyData = await getMyHistory();

        setQuizes(quizesData);
        setHistory(historyData);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  console.log(history);

  return (
    <MaxWidthWrapper>
      {/* user profile */}
      <section>
        <div className="w-full flex justify-center ">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-8 justify-between max-w-screen-sm">
              {
                <div>
                  {user?.image_url ? (
                    <Avatar className="w-20 h-20" imageUrl={user.image_url} />
                  ) : (
                    <div className="w-20 h-20 bg-green-600 rounded-full grid place-items-center text-xl">
                      {user?.name.slice(0, 1)}
                    </div>
                  )}
                </div>
              }

              <div className="flex items-center justify-between flex-1">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-semibold">
                    {numberFormatter.format(user.followers_count)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    Followers
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-semibold">
                    {numberFormatter.format(user?.following_count)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    Following
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-semibold">
                    {numberFormatter.format(user?.saved_count)}
                  </span>
                  <span className="text-muted-foreground text-sm">Saved</span>
                </div>
              </div>
            </div>
            <div className="my-4">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-muted-foreground text-sm">{user.bio}</p>
            </div>
            <div className="pb-4">
              <Button
                onClick={() => router.push("/me/edit")}
                className=""
                variant={"outline"}
              >
                Edit profile
              </Button>
            </div>
          </div>
        </div>
        <Separator />
      </section>

      {loading && (
        <div className="mt-10 h-40 grid place-items-center">
          <Loader />
        </div>
      )}

      {/* Your history */}
      {history.length > 0 && (
        <section>
          <div className="py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Your History</h2>{" "}
            </div>
            <Carousel className="w-full mt-6">
              <CarouselContent>
                {history.map((history) => (
                  <CarouselItem
                    className="flex items-center justify-center  basis-2/3 lg:basis-2/6 mr-2"
                    key={history.id}
                  >
                    <div className="w-full relative aspect-video rounded-md overflow-hidden">
                      <Image src={history.quiz.thumbnail} alt="" fill />
                      <div className="bg-black/70 absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex gap-2 items-center">
                              <span className="text-sm text-muted-foreground">
                                Score:
                              </span>
                              <span className="text-lg font-semibold text-white ">
                                {history.points} / {history.quiz.questionCount}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() =>
                              router.push(`/play/${history.quiz_id}`)
                            }
                          >
                            Play again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      )}

      {/* Your quizes */}
      {quizes.length > 0 && (
        <section className="mt-2 mb-10">
          <h2 className="text-xl font-bold">Your quizes</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {quizes.map((quiz) => (
              <QuizCard key={quiz.id} type={"PERSONAL"} quiz={quiz} />
            ))}
          </div>
        </section>
      )}
    </MaxWidthWrapper>
  );
};

export default UserPage;
