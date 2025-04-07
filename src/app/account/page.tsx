import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { database } from "@/db/database";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const currentUser = await database
    .select()
    .from(user)
    .where(eq(user.email, session.user.email));

  return (
    <div>
      <h1>Account</h1>
      <p>{currentUser[0].email}</p>
      <p>{currentUser[0].name}</p>
      <p>{currentUser[0].image}</p>
      <p>{currentUser[0].id}</p>
    </div>
  );
}
