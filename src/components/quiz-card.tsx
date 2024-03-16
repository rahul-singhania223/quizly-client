"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Quiz } from "@/types";
import Avatar from "./avatar";
import NumberDetails from "./quiz-number-details";
import { updatePlayCount } from "@/actions/play";
import PageLoader from "./page-loader";

interface QuizCardProps {
  quiz: Quiz;
  type?: "PERSONAL" | "OTHERS";
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, type }) => {
  if (!quiz) return <PageLoader />;

  return (
    <div className="shadow hover:ring-2 mb-10 relative rounded-lg overflow-hidden flex flex-col w-full">
      <Link onClick={() => updatePlayCount(quiz.id)} href={`/play/${quiz.id}`}>
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
            className="w-10 h-10"
            imageUrl={quiz.author?.image_url}
          />
        )}

        <div className="flex-1">
          <h4 className="text-regular text-semibold">
            {quiz.title.length > 50
              ? `${quiz?.title?.slice(0, 50)}...`
              : quiz.title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {quiz.author?.name}
          </p>
          <NumberDetails
            type={type}
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
