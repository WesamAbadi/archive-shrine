"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const signIn = async (email: string, password: string) => {
  await auth.api.signInEmail({
    body: {
      email: "test@test.com",
      password: "password123",
    },
  });
  revalidatePath("/");
};

export const signUp = async (email: string, password: string, name: string) => {
  await auth.api.signUpEmail({
    body: {
      name: "test",
      email: "test@test.com",
      password: "password123",
    },
  });
  revalidatePath("/");
};