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
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.get("/auth/logout");
  },

  async getMe(): Promise<{ user: User }> {
    const response = await api.get<{ user: User }>("/auth/me");
    return response.data;
  },
};
