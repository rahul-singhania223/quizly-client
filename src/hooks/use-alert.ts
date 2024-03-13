import { create } from "zustand";

interface AlertStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAlert = create<AlertStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
