import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Quiz } from "@/types";
import Avatar from "./avatar";
import NumberDetails from "./quiz-number-details";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  return (
    <div className="shadow hover:ring-2 mb-10 relative rounded-lg overflow-hidden flex flex-col w-full">
      <Link href={`/play/${quiz.id}`}>
        <div className="w-full flex-1 relative aspect-video">
          <Image
            className="w-auto h-auto object-cover"
            src={quiz.thumbnail}
            alt="image"
            fill
          />
        </div>
      </Link>

      <div className="p-3 flex gap-5">
        {quiz.author && (
          <Avatar
            author={quiz.author}
            className=""
            imageUrl={quiz.author?.image_url}
          />
        )}

        <div className="flex-1">
          <h4 className="text-regular text-semibold">
            {quiz.title.length > 50
              ? `${quiz.title.slice(0, 50)}...`
              : quiz.title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {quiz.author?.name}
          </p>
          <NumberDetails
            quiz={quiz}
            likes={quiz.likes_count}
            plays={quiz.plays_count}
            questions={quiz.questionCount}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
