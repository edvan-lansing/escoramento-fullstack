"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import apiClient from "@/src/services/api/client";
import { Button, Input } from "@/src/components/atoms";
import { setAuthSession, type UserRole } from "@/src/utils/auth";

type LoginResponse = {
  token: string;
  user?: {
    id?: string;
    email?: string;
    role?: UserRole;
  };
};

const LoginPageTemplate = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      setAuthSession(response.data.token, response.data.user);
      router.push("/products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Invalid email or password.");
      } else {
        setErrorMessage("Unexpected error while trying to log in.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">CMS Admin Login</h1>
            <p className="mt-1 text-sm text-slate-600">Enter your credentials to continue.</p>
          </div>

          {errorMessage ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {errorMessage}
            </div>
          ) : null}

          <Input
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />

          <Input
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />

          <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-white" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPageTemplate;
