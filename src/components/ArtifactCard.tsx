import { Card, CardContent } from "@/components/ui/card";
import { artifacts } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
export function ArtifactCard({
  artifact,
}: {
  artifact: typeof artifacts.$inferSelect;
}) {
  return (
    <Link href={`/artifacts/${artifact.id}`}>
      <Card className="flex aspect-square items-center justify-center p-6 overflow-hidden">
        <CardContent>
          {/* <Image
          src={artifact.url}
          alt={artifact.title}
          width={100}
          height={100}
          className="aspect-square object-cover"
        /> */}
          <span className="text-3xl font-semibold">{artifact.title}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
