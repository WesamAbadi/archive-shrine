
import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { arifacts } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
export default async function Home() {
  const artifacts = await database.select().from(arifacts);
  return (
    <main className="container mx-auto">
      <h1>HOME</h1>
      <form action={async (formData: FormData) => {
        "use server";
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
      }}>

        <Input type="text" name="title" defaultValue="test" placeholder="title" />
        <Input type="text" name="description" defaultValue="test" placeholder="description" />
        <Input type="text" name="url" defaultValue="test" placeholder="url" />

        <Button type="submit">Submit</Button>
      </form>
      <div>
        {artifacts.map((artifact) => (
          <div key={artifact.id}>{artifact.title}</div>
        ))}
      </div>
    </main>
  );
}
