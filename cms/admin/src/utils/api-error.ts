export const getApiErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message?: string }).message ?? "Unexpected error");
  }

  return "Unexpected error";
};
