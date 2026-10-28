import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
