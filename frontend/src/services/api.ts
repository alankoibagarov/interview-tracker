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
): Promise<T | null> {
  const baseUrl = process.env.VITE_API_LINK;

  const headers: HeadersInit = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    ...options?.headers,
  };

  if (!(options?.body instanceof FormData)) {
    (headers as any)["Content-Type"] = "application/json";
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === ResponseCodes.Unauthorized) {
    logoutUser();
    return null;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function requestBlob(
  endpoint: string,
  options?: RequestInit
): Promise<Blob> {
  const baseUrl = process.env.VITE_API_LINK;

  const response = await fetch(`${baseUrl}${endpoint}`, {
     ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (response.status === ResponseCodes.Unauthorized) {
    logoutUser();
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.blob();
}