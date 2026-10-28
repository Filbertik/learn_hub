"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";

import { auth } from "@/firebase/auth";
import { useAuth } from "@/components/auth/AuthProvider";

export default function AuthActions() {
  const { user, isLoading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState("");

  async function handleSignOut() {
    setError("");
    setIsSigningOut(true);

    try {
      await signOut(auth);
    } catch {
      setError("Не вдалося вийти з акаунта. Спробуй ще раз.");
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isLoading) {
    return (
      <div
        className="h-10 w-24 animate-pulse rounded-lg bg-slate-100"
        aria-label="Завантаження стану авторизації"
      />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-lg px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Увійти
        </Link>

        <Link
          href="/register"
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Реєстрація
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="max-w-48 truncate text-sm text-slate-600">
        {user.displayName || user.email}
      </span>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
        className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
      >
        {isSigningOut ? "Вихід..." : "Вийти"}
      </button>

      {error && (
        <p role="alert" className="w-full text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
