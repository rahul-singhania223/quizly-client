import { Quiz } from "@/types";
import { create } from "zustand";

interface ShareModelStore {
  open: boolean;
  quiz: Quiz | null;
  onClose: () => void;
  onOpen: (quiz: Quiz) => void;
}

export const useShare = create<ShareModelStore>((set) => ({
  open: false,
  quiz: null,
  onClose: () => set({ open: false }),
  onOpen: (quizData: Quiz) => set({ open: true, quiz: quizData }),
}));
