import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string().min(1),
    FILE_UPLOAD_DIR: z.string().url(),
    UPLOAD_URL: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    FILE_UPLOAD_DIR: process.env.FILE_UPLOAD_DIR,
    UPLOAD_URL: process.env.UPLOAD_URL,
  },
});
