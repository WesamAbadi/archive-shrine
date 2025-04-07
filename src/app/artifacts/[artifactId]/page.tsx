import { database } from "@/db/database";
import { artifacts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { env } from "@/env";
import Image from "next/image";
export default async function ArtifactPage({
  params,
}: {
  params: { artifactId: string };
}) {
  const artifact = await database
    .select()
    .from(artifacts)
    .where(eq(artifacts.id, parseInt(params.artifactId)));
  console.log(artifact);
  if (!artifact[0]) {
    return <div>Artifact not found</div>;
  }

  return (
    <div>
      <Image
        src={`${env.UPLOAD_URL}/${artifact[0].url}`}
        alt={artifact[0].title}
      width={100}
        height={100}
      />
      <h1>{artifact[0].title}</h1>
      <p>{artifact[0].description}</p>
      <p>{artifact[0].url}</p>
      <p>{artifact[0].type}</p>
      <p>{artifact[0].createdAt.toLocaleDateString()}</p>
      <p>{artifact[0].updatedAt.toLocaleDateString()}</p>
    </div>
  );
}
