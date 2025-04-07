import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { database } from "@/db/database";
import { artifacts } from "@/db/schema";
import { env } from "@/env";
const isProd = env.NODE_ENV === "production";

// Create upload directory if it doesn't exist
const uploadDir = isProd
  ? path.join(process.cwd(), "uploads")
  : path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req: NextRequest) {
  try {
    // Use Next.js built-in formData method
    const formData = await req.formData();

    // Get file from form data
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Get form fields
    const title = (formData.get("title") as string) || "";
    const description = (formData.get("description") as string) || "";

    // Create a unique filename
    const uniqueFilename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Convert file to buffer and save to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    // Insert the file metadata into the database
    await database.insert(artifacts).values({
      title,
      description,
      url: uniqueFilename,
      type: "test",
    });

    return NextResponse.json(
      { message: "Artifact submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting artifact:", error);
    return NextResponse.json(
      { error: "Failed to submit artifact" },
      { status: 500 }
    );
  }
}
