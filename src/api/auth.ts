import axiosInstance from "./axiosInstance";
import { UserType } from "@/types/users";
import { TEAM_ID } from "@/constants/team";

interface AuthResponse extends UserType {
  accessToken: string;
}

export const postAuthData = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post<AuthResponse>(
    `/${TEAM_ID}/auth/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};
