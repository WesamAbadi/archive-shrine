// src/app/page.tsx
import FormClient from "@/components/FormClient";
import { database } from "@/db/database";
import { arifacts } from "@/db/schema";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
export default async function Home() {
  const artifacts = await database.select().from(arifacts);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <main className="container mx-auto">
      <h1>HOME</h1>
      <FormClient session={session} />
      <div>
        {artifacts.map((artifact) => (
          <div key={artifact.id}>{artifact.title}</div>
        ))}
      </div>
    </main>
  );
}
