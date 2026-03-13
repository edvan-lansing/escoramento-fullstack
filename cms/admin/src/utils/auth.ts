export type UserRole = "admin" | "editor" | "manager";

export type AuthUser = {
  id?: string;
  email?: string;
  role?: UserRole;
};

const TOKEN_STORAGE_KEY = "token";
const USER_STORAGE_KEY = "auth_user";

type JwtPayload = {
  sub?: string;
  email?: string;
  role?: UserRole;
  exp?: number;
};

const safeBase64UrlDecode = (value: string): string | null => {
  try {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

    if (typeof window === "undefined") {
      return null;
    }

    return window.atob(padded);
  } catch {
    return null;
  }
};

const parseJwtPayload = (token: string): JwtPayload | null => {
  const parts = token.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const decodedPayload = safeBase64UrlDecode(parts[1]);

  if (!decodedPayload) {
    return null;
  }

  try {
    return JSON.parse(decodedPayload) as JwtPayload;
  } catch {
    return null;
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const setAuthSession = (token: string, user?: AuthUser): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);

  if (user) {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  window.dispatchEvent(new Event("auth:changed"));
};

export const clearAuthSession = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(USER_STORAGE_KEY);
  window.dispatchEvent(new Event("auth:changed"));
};

const getStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
};

export const getCurrentUser = (): AuthUser | null => {
  const token = getToken();
  const payload = token ? parseJwtPayload(token) : null;
  const storedUser = getStoredUser();

  if (!token && !storedUser) {
    return null;
  }

  return {
    id: storedUser?.id ?? payload?.sub,
    email: storedUser?.email ?? payload?.email,
    role: storedUser?.role ?? payload?.role,
  };
};

export const getCurrentUserRole = (): UserRole | null => {
  return getCurrentUser()?.role ?? null;
};

export const isTokenExpired = (): boolean => {
  const token = getToken();

  if (!token) {
    return true;
  }

  const payload = parseJwtPayload(token);

  if (!payload?.exp) {
    return false;
  }

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= currentTimeInSeconds;
};
