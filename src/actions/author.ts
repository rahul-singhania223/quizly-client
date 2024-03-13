import { server } from "@/constants";
import axios from "axios";

export const getAuthorById = async (authorId: string) => {
  try {
    const response = await axios.get(`${server}/author/${authorId}`);

    return response.data;
  } catch (error: any) {
    console.log("[couldn't get author details]", error);
    return null;
  }
};

export const getTopAuthors = async () => {
  try {
    const response = await axios.get(`${server}/author`);

    return response.data;
  } catch (err: any) {
    console.log("[couldn't get top authors]", err);
    return [];
  }
};
