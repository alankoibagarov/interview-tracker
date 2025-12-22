import { request, ResponseCodes } from "./api";

export interface User {
  username: string;
  email: string;
  themeDarkMode: boolean;
}

interface LoginResponse {
  access_token: string;
  statusCode: ResponseCodes;
  themeDarkMode: boolean;
  email: string;
}

class AuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    switch (response.statusCode) {
      case ResponseCodes.BadRequest:
        throw new Error("Invalid credentials");
      case ResponseCodes.OK:
        return response;
      default:
        throw new Error("Login failed");
    }
  }

  async setTheme(
    username: string,
    themeDarkMode: boolean
  ): Promise<LoginResponse> {
    const response = await request<LoginResponse>("/users/setTheme", {
      method: "POST",
      body: JSON.stringify({ username, themeDarkMode }),
    });

    switch (response.statusCode) {
      case ResponseCodes.BadRequest:
        throw new Error("Invalid credentials");
      case ResponseCodes.OK:
        return response;
      default:
        throw new Error("Login failed");
    }
  }

  async getUserData(): Promise<{ statusCode: number; user: User }> {
    const response = await request<{ statusCode: number; user: User }>(
      "/users/getUserData"
    );

    switch (response.statusCode) {
      case ResponseCodes.BadRequest:
        throw new Error("Invalid credentials");
      case ResponseCodes.OK:
        return response;
      default:
        throw new Error("Login failed");
    }
  }

  async register(
    user: Record<string, string>
  ): Promise<{ statusCode: number }> {
    const response = await request<{ statusCode: number }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(user),
      }
    );

    if (response) {
      return { statusCode: 200 };
    }
    throw new Error("Registration failed");
  }
}

export const authService = new AuthService();
