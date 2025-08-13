import { request, ResponseCodes } from "./api";

export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  statusCode: ResponseCodes;
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
}

export const authService = new AuthService();
