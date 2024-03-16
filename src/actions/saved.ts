// GET SAVED QUIZES

import { server } from "@/constants";
import axios from "axios";

export const getSavedQuizes = async () => {
  try {
    const response = await axios.get(`${server}/saved`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.log("[couldn't get saved quizes]", error);
    return [];
  }
};

export const saveQuiz = async (quizId: string) => {
  try {
    const response = await axios.post(
      `${server}/saved`,
      { quizId },
      { withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const unsaveQuiz = async (quizId: string) => {
  try {
    const response = await axios.patch(
      `${server}/saved`,
      { quizId },
      { withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};
