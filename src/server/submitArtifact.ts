// src/actions/submitArtifact.ts
"use server";
import path from "path";

import { database } from "@/db/database";
import { artifacts } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function submitArtifact(formData: FormData) {
  const isProd = process.env.NODE_ENV === "production";

  const uploadDir = isProd
    ? "/mnt/storage/uploads"
    : path.join(process.cwd(), "uploads");
  console.log(uploadDir);

  console.log(formData);
  const title = formData.get("title");
  const description = formData.get("description");
  const url = formData.get("url");

  await database.insert(artifacts).values({
    title: title as string,
    description: description as string,
    url: url as string,
    type: "test",
  });

  revalidatePath("/");
}
