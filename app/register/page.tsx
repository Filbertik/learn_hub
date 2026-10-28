import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
