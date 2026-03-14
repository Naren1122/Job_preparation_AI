// Auth Service - API calls for authentication
import api from "../lib/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "../types/auth";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/api/auth/login",
      credentials,
    );
    // Token is set as HTTP-only cookie by the backend - no need to store in localStorage
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/api/auth/register",
      userData,
    );
    // Token is set as HTTP-only cookie by the backend - no need to store in localStorage
    return response.data;
  },

  async logout(): Promise<void> {
    await api.get("/api/auth/logout");
    // Token is cleared from HTTP-only cookie by the backend
    // Also clear localStorage if it exists (for clean state)
    localStorage.removeItem("token");
  },

  async getMe(): Promise<{ user: User }> {
    const response = await api.get<{ user: User }>("/api/auth/me");
    return response.data;
  },
};
