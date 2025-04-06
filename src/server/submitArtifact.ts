// src/actions/submitArtifact.ts
"use server";

import { database } from "@/db/database";
import { arifacts } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function submitArtifact(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const url = formData.get("url");

  await database.insert(arifacts).values({
    title: title as string,
    description: description as string,
    url: url as string,
    type: "test",
  });

  revalidatePath("/");
}
