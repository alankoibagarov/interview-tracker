import { useUserStore } from "../store/userStore";

export enum ResponseCodes {
  OK = 200,
  Created = 201,
  NotFound = 404,
  BadRequest = 400,
  Unauthorized = 401,
}

const logoutUser = () => {
  localStorage.clear();
  useUserStore.getState().setUser(null);
  if (location.pathname !== "/") {
    window.location.replace("/");
  }
};

export async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = process.env.VITE_API_LINK;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      ...options?.headers,
    },
    ...options,
  });

  if (response.status === ResponseCodes.Unauthorized) {
    logoutUser();
  }

  return response.json();
}
