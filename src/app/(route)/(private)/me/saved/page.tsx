"use client";

import { useEffect, useState } from "react";

import { getSavedQuizes } from "@/actions/saved";
import Loader from "@/components/model/loader";
import PageHeader from "@/components/page-header";
import QuizCard from "@/components/quiz-card";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Saved } from "@/types";

const SavedPage = () => {
  const [savedQuizes, setSavedQuizes] = useState<Saved[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSavedQuizesData = async () => {
      try {
        setLoading(true);
        const data = await getSavedQuizes();

        setSavedQuizes(data);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getSavedQuizesData();
  }, []);

  return (
    <MaxWidthWrapper>
      <PageHeader title="Saved quizes" />

      {savedQuizes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4 ">
          {savedQuizes.map((saved) => (
            <QuizCard key={saved.id} quiz={saved.quiz} />
          ))}
        </div>
      )}

      {savedQuizes.length === 0 && !loading && (
        <div className="mt-10 h-40 grid place-items-center text-muted-foreground">
          You have no saved quizes{" "}
        </div>
      )}

      {loading && (
        <div className="mt-10 h-40 grid place-items-center text-muted-foreground">
          <Loader />
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default SavedPage;
