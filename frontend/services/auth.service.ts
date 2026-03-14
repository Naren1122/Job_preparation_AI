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
    // Store token in localStorage and cookie for middleware access
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      // Set cookie for middleware (Next.js can read this)
      document.cookie = `token=${response.data.token}; path=/; max-age=${24 * 60 * 60}; SameSite=Lax`;
    }
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    // Store token in localStorage and cookie for middleware access
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      // Set cookie for middleware (Next.js can read this)
      document.cookie = `token=${response.data.token}; path=/; max-age=${24 * 60 * 60}; SameSite=Lax`;
    }
    return response.data;
  },

  async logout(): Promise<void> {
    await api.get("/auth/logout");
    // Clear token from localStorage and cookie
    localStorage.removeItem("token");
    // Expire the cookie
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  },

  async getMe(): Promise<{ user: User }> {
    const response = await api.get<{ user: User }>("/auth/me");
    return response.data;
  },
};
