import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Вхід | LearnHub",
  description: "Увійди у свій акаунт LearnHub.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
