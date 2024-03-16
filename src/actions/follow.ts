import { server } from "@/constants";
import axios from "axios";

export const followAuthor = async (authorId: string) => {
  try {
    const response = await axios.post(
      `${server}/author/${authorId}/follow`,
      {},
      { withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const unfollowAuthor = async (authorId: string) => {
  try {
    const response = await axios.delete(
      `${server}/author/${authorId}/follow`,

      { withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};
