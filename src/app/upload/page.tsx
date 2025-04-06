import FormClient from "@/components/FormClient";
import { database } from "@/db/database";
import { arifacts } from "@/db/schema";

export default async function UploadPage() {
  const artifacts = await database.select().from(arifacts);
  return (
    <div>
      <FormClient />
      <div>
        {artifacts.map((artifact) => (
          <div key={artifact.id}>{artifact.title}</div>
        ))}
      </div>
    </div>
  );
}
