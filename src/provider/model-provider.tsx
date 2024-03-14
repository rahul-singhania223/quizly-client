"use client";

import ShareModel from "@/components/model/share-model";
import { useEffect, useState } from "react";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ShareModel />
    </>
  );
};

export default ModelProvider;
