import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Реєстрація | LearnHub",
  description: "Створи акаунт LearnHub та розпочни навчання.",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
