"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/firebase/auth";

interface AuthFormProps {
  mode: "login" | "register";
}

function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Цей email уже зареєстрований.";
    case "auth/invalid-email":
      return "Введи коректну email-адресу.";
    case "auth/weak-password":
      return "Пароль має містити щонайменше 6 символів.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Неправильний email або пароль.";
    case "auth/too-many-requests":
      return "Забагато спроб. Спробуй пізніше.";
    case "auth/network-request-failed":
      return "Помилка мережі. Перевір підключення до інтернету.";
    case "auth/operation-not-allowed":
      return "У Firebase Console не ввімкнено Email/Password.";
    default:
      return "Не вдалося виконати операцію. Спробуй ще раз.";
  }
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();

  const isRegister = mode === "register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      if (isRegister) {
        const credential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        );

        const displayName = name.trim();

        if (displayName) {
          await updateProfile(credential.user, {
            displayName,
          });
        }
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }

      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
          ? error.code
          : "";

      setError(getAuthErrorMessage(code));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-blue-700"
          >
            LearnHub
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            {isRegister ? "Створити акаунт" : "З поверненням!"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isRegister
              ? "Зареєструйся, щоб розпочати навчання."
              : "Увійди у свій акаунт LearnHub."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {isRegister && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Ім’я
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Твоє ім’я"
                maxLength={80}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Пароль
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={6}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Мінімум 6 символів"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Зачекай..."
              : isRegister
                ? "Зареєструватися"
                : "Увійти"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {isRegister ? "Уже маєш акаунт?" : "Ще не маєш акаунта?"}{" "}
          <Link
            href={isRegister ? "/login" : "/register"}
            className="font-semibold text-blue-700 hover:text-blue-900"
          >
            {isRegister ? "Увійти" : "Зареєструватися"}
          </Link>
        </p>
      </div>
    </main>
  );
}
