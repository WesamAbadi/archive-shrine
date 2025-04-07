import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { ArtifactCard } from "@/components/ArtifactCard";
import { database } from "@/db/database";
import { artifacts } from "@/db/schema";
export async function Recommendations() {
  const artifactList = await database.select().from(artifacts);

  return (
    <div>
      <Label className="text-2xl font-bold">Recommendations</Label>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {artifactList.map((artifact) => (
            <CarouselItem
              key={artifact.id}
              className="basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="p-1">
                <ArtifactCard artifact={artifact} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
