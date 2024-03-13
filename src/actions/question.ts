import { server } from "@/constants";
import axios from "axios";

export const getQuestionById = async (quizId: string, questionId: string) => {
  try {
    const response = await axios.get(
      `${server}/quizes/${quizId}/question/${questionId}`
    );

    return response.data;
  } catch (error: any) {
    console.log("[couldn't get question data]", error);
    return null;
  }
};

export const deleteQuestionById = async (
  quizId: string,
  questionId: string
) => {
  try {
    const response = await axios.delete(
      `${server}/quizes/${quizId}/question/${questionId}`,
      {
        withCredentials: true,
      }
    );
  } catch (error: any) {
    console.log("[couldn't delete a question]", error);
  }
};

export const getQuestionsByQuizId = async (quizID: string, play?: boolean) => {
  try {
    const response = await axios.get(
      `${server}/quizes/${quizID}/question?play=${play}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    console.log("[Couldn't get questions by quiz id]", error.response?.data);
    return [];
  }
};

interface QuestionFormData {
  title: string;
  options: string;
  exams?: string;
  answer: string;
}

export const createNewQuestion = async (
  quizId: string,
  data: QuestionFormData
) => {
  try {
    const response = await axios.post(
      `${server}/quizes/${quizId}/question`,
      data,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateQuestion = async (
  quizId: string,
  questionId: string,
  data: QuestionFormData
) => {
  try {
    const response = await axios.patch(
      `${server}/quizes/${quizId}/question/${questionId}`,
      data,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};
