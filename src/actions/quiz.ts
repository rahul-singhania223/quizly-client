import axios from "axios";

import { server } from "@/constants";

export const getQuizById = async (quizID: string) => {
  try {
    const response = await axios.get(`${server}/quizes/${quizID}`);

    return response.data;
  } catch (error: any) {
    console.log("[Couldn't get quiz]", error);
    return null;
  }
};

export const getQuizesByAuthor = async (authorID: string, quizID: string) => {
  try {
    const response = await axios.get(
      `${server}/quizes/${quizID}/author/${authorID}`
    );

    return response.data;
  } catch (error: any) {
    console.log("[Couldn't get more quizes from author]", error);
    return [];
  }
};

export const deleteQuizById = async (quizID: string) => {
  try {
    const response = await axios.delete(`${server}/quizes/${quizID}`, {
      withCredentials: true,
    });
  } catch (error: any) {
    console.log("Couldn't delete quiz", error);
  }
};

export const getQuizByIdWithQuestions = async (quizId: string) => {
  try {
    const response = await axios.get(
      `${server}/quizes/${quizId}?questions=true`
    );

    return response.data;
  } catch (error: any) {
    console.log("[Couldn't get quiz details]", error);
    return null;
  }
};

export const getTrendingQuizes = async () => {
  try {
    const response = await axios.get(`${server}/quizes?type=trending`);

    return response.data;
  } catch (error: any) {
    console.log("[couldn't get trending quizes]", error);
    return [];
  }
};

export const getFeedQuizes = async () => {
  try {
    const response = await axios.get(`${server}/quizes`);

    return response.data;
  } catch (error: any) {
    console.log("[couldn't get feed quizes]", error);
    return [];
  }
};

export const getMyQuizes = async () => {
  try {
    const response = await axios.get(`${server}/me/quizes`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.log("[couldn't get quizes]", error);
    return [];
  }
};

interface QuizFormData {
  id?: string;
  thumbnail: string;
  title: string;
  description: string;
}

export const createNewQuiz = async (data: QuizFormData) => {
  try {
    const response = await axios.post(`${server}/quizes`, data, {
      withCredentials: true,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateQuiz = async (data: QuizFormData) => {
  try {
    const response = await axios.patch(`${server}/quizes/${data.id}`, data, {
      withCredentials: true,
    });

    return response;
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getTopQuizes = async () => {
  try {
    const response = await axios.get(`${server}/quizes?type=top`);
  } catch (error: any) {
    console.log("[Couldn't get top quizes]", error);
    return [];
  }
};
