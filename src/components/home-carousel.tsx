import React from "react";
import Image from "next/image";

import { Quiz } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PlayButton from "@/components/ui/play-button";
import NumberDetails from "@/components/quiz-number-details";
import PageLoader from "./page-loader";

interface HomeCarouselProps {
  quizes: Quiz[];
}

const HomeCarousel: React.FC<HomeCarouselProps> = ({ quizes }) => {
  if (!quizes) return <PageLoader />;

  return (
    <Carousel className="">
      <CarouselContent className="-ml-0 gap-3 ">
        {quizes.map((quiz) => (
          <CarouselItem key={quiz.id} className="p-0">
            <div className=" aspect-[3/1.5] md:aspect-[3/1.1] lg:aspect-[5/1] rounded-md p-3 relative">
              <div className="max-w-[70%]">
                <h1 className="text-xl font-semibold">
                  {quiz?.title?.length > 30
                    ? `${quiz?.title?.slice(0, 30)}...`
                    : quiz.title}
                </h1>
                <p className="font-light mt-3 text-muted-foreground">
                  {quiz?.description?.slice(0, 50) + "..."}
                </p>
                <div className="absolute bottom-4">
                  <PlayButton quiz_id={quiz.id} />
                </div>
              </div>

              <div className="flex items-center gap-6 absolute right-3 bottom-2 text-neutral-400 text-xs">
                <NumberDetails
                  quiz={quiz}
                  likes={quiz.likes_count}
                  plays={quiz.plays_count}
                  questions={quiz.questionCount}
                />
              </div>

              <div className="w-20 h-20 absolute top-3 right-3 rounded-full overflow-hidden">
                {quiz.author?.image_url && (
                  <Image
                    className="object-cover"
                    src={quiz.author.image_url}
                    fill
                    alt="author-image"
                  />
                )}

                {!quiz.author?.image_url && (
                  <div className="bg-green-700 w-full h-full rounded-full flex items-center justify-center">
                    {quiz.author?.name?.slice(0, 1)}
                  </div>
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HomeCarousel;
