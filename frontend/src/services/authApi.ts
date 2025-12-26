import { request, ResponseCodes } from "./api";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  username: string;
  email: string;
  themeDarkMode: boolean;
  role: UserRole;
  profilePicture?: string | null;
}

interface LoginResponse {
  access_token: string;
  statusCode: ResponseCodes;
  themeDarkMode: boolean;
  email: string;
  role: UserRole;
}

class AuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (!response) {
      throw new Error("Login failed: No response");
    }

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

    if (!response) {
      throw new Error("Failed to set theme: No response");
    }

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

    if (!response) {
      throw new Error("Failed to get user data: No response");
    }

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


  async uploadProfilePicture(file: File): Promise<{ statusCode: number; profilePicture: string } | null> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await request<{ statusCode: number; profilePicture: string } | null>(
      "/users/upload-profile-picture",
      {
        method: "POST",
        body: formData,
      }
    );
    return response;
  }

  async deleteProfilePicture(): Promise<{ statusCode: number } | null> {
    return request<{ statusCode: number } | null>("/users/profile-picture", {
      method: "DELETE",
    });
  }
}

export const authService = new AuthService();
