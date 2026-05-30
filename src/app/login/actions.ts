"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signToken } from "@/lib/auth";

const COOKIE_NAME = "tai_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function login(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const user = formData.get("user")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (
    user !== process.env.DEMO_USER ||
    password !== process.env.DEMO_PASSWORD
  ) {
    return { error: "Credenciales incorrectas" };
  }

  const token = await signToken({ user });

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  redirect("/app/agenda");
}
