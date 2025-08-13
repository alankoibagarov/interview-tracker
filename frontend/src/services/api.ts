export enum ResponseCodes {
  OK = 200,
  Created = 201,
  NotFound = 404,
  BadRequest = 400,
  Unauthorized = 401,
}

export async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_LINK;
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  return response.json();
}
