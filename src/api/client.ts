import useAuthStore from "../store/authStore";
import type {
  Event,
  ApiRSVP,
  NewRSVP,
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../types/index";

export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000"
).replace(/\/+$/, "");

/**
 * Consolidated generic API client request function.
 * Automatically resolves endpoint against import.meta.env.VITE_API_URL
 * and attaches Authorization: Bearer <token> when logged in.
 */
export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const cleanEndpoint =
    API_URL.endsWith("/api") && normalizedEndpoint.startsWith("/api/")
      ? normalizedEndpoint.slice(4)
      : normalizedEndpoint;

  const url = `${API_URL}${cleanEndpoint}`;
  const token = useAuthStore.getState().token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMessage = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) {
        errorMessage = data.message;
      } else if (Array.isArray(data?.errors) && data.errors.length > 0) {
        errorMessage = data.errors.join(", ");
      }
    } catch {
      // Fallback to generic message
    }
    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return (await res.json()) as T;
}

// ===== API HELPERS =====

export async function fetchEvents(): Promise<Event[]> {
  return request<Event[]>("/api/events");
}

export async function fetchEventById(id: string): Promise<Event> {
  return request<Event>(`/api/events/${id}`);
}

export async function fetchRSVPs(): Promise<ApiRSVP[]> {
  return request<ApiRSVP[]>("/api/rsvps");
}

export async function createRSVP(newRSVP: NewRSVP): Promise<ApiRSVP> {
  return request<ApiRSVP>("/api/rsvps", {
    method: "POST",
    body: JSON.stringify(newRSVP),
  });
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function registerUser(data: RegisterData): Promise<User> {
  return request<User>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
