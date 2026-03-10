export type UserRole = "admin" | "editor" | "manager";

type JwtPayload = {
  sub?: string;
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

  return window.localStorage.getItem("token");
};

export const getCurrentUserRole = (): UserRole | null => {
  const token = getToken();

  if (!token) {
    return null;
  }

  const payload = parseJwtPayload(token);

  if (!payload?.role) {
    return null;
  }

  return payload.role;
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
