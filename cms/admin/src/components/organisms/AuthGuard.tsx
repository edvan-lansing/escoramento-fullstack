"use client";

import { useEffect, type PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthSession, getToken, isTokenExpired } from "@/src/utils/auth";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = Boolean(getToken()) && !isTokenExpired();

  useEffect(() => {
    if (!isAuthenticated) {
      clearAuthSession();
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
