import { User } from "@/types";
import { create } from "zustand";

interface UseUserStore {
  user: User | null;
  status: "LOADING" | "AUTHENTICATED" | "UNAUTHENTICATED";
  changeStatus: (
    value: "LOADING" | "AUTHENTICATED" | "UNAUTHENTICATED"
  ) => void;
  addUser: (data: User) => void;
  removeUser: () => void;
}

export const useUser = create<UseUserStore>((set) => ({
  user: null,
  status: "LOADING",
  addUser: (data: User) => set({ user: data, status: "AUTHENTICATED" }),
  removeUser: () => set({ user: null, status: "UNAUTHENTICATED" }),
  changeStatus: (value: "LOADING" | "AUTHENTICATED" | "UNAUTHENTICATED") =>
    set({ status: "UNAUTHENTICATED" }),
}));
