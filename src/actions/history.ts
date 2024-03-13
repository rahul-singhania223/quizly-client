import { server } from "@/constants";
import axios from "axios";

export const updateHistoryByQuizId = async (quizId: string) => {
  try {
    const response = await axios.patch(
      `${server}/quizes/${quizId}/history`,
      {},
      { withCredentials: true }
    );
  } catch (error: any) {
    throw error;
  }
};

export const getMyHistory = async () => {
  try {
    const response = await axios.get(`${server}/quizes/no/history`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.log("[couldn't get history]", error);
    return [];
  }
};

export const resetHistory = async (quizId: string) => {
  try {
    const response = await axios.patch(
      `${server}/quizes/${quizId}/history?reset=true`,
      {},
      { withCredentials: true }
    );
  } catch (error: any) {
    console.log("[couldn't reset history]", error);
    throw error;
  }
};
