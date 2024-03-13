import { toast } from "@/components/ui/use-toast";
import { server } from "@/constants";
import axios from "axios";

// AUTHORIZE USER

export const authUser = async () => {
  try {
    const response = await axios.get(`${server}/user/me`, {
      withCredentials: true,
    });

    if (response.data) return response.data;

    return null;
  } catch (error: any) {
    console.log("[AUTHORIZATION_ERROR]", error);
    return null;
  }
};

// LOG-OUT USER

export async function logOut() {
  try {
    const response = await axios.get(`${server}/user/log-out`, {
      withCredentials: true,
    });

    toast({
      title: "Log out successfully",
    });

    location.reload();
  } catch (err: any) {
    console.log("[LOG_OUT]", err);

    toast({
      title: "Oops!",
      description: err?.response?.data || "Something went wrong",
      variant: "destructive",
    });
  }
}

export async function resendOTP() {
  try {
    const response = await axios.get(`${server}/user/resend-otp`, {
      withCredentials: true,
    });

    toast({
      title: "New OTP assigned",
    });
  } catch (error: any) {
    console.log("[RESEND_OTP_ERROR]", error);

    toast({
      title: "Oops!",
      description: error?.response?.data || "something went wrong",
      variant: "destructive",
    });
  }
}

interface UserCredentials {
  name?: string;
  email: string;
  password: string;
}

export const loginWithEmail = async (data: UserCredentials) => {
  try {
    const response = await axios.post(`${server}/user/log-in`, data, {
      withCredentials: true,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const registerWithEmail = async (data: UserCredentials) => {
  try {
    const response = await axios.post(`${server}/user/sign-up`, data, {
      withCredentials: true,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const response = await axios.post(`${server}/user/forgot-password`, data, {
      withCredentials: true,
    });
  } catch (error: any) {
    throw error;
  }
};

export const verify = async (action: string, email: string, data: any) => {
  try {
    const response = await axios.post(
      `${server}/user/verify?action=${action}`,
      data,
      { withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateProfile = async (data: any) => {
  try {
    const response = await axios.patch(`${server}/user`, data, {
      withCredentials: true,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};
