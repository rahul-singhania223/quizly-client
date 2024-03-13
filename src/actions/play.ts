import { server } from "@/constants";
import axios from "axios";

export const updatePlayCount = async (quizId: string) => {
  try {
    const response = await axios.get(`${server}/quizes/${quizId}/play`, {
      withCredentials: true,
    });
  } catch (error: any) {
    throw error;
  }
};
