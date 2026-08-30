"use client";

import { churches } from "@/data/map/churches";
import { ChurchBlock } from "../ui/ChurchBlock";

interface Props {
  whereWeAreHighlighted: boolean;
}

export function ChurchesLayer({ whereWeAreHighlighted }: Props) {
  return (
    <g role="group" aria-label="Seven Churches layer">
      {churches.map((church) => (
        <ChurchBlock
          key={church.id}
          church={church}
          whereWeAreHighlighted={
            whereWeAreHighlighted && church.id === "laodicea"
          }
        />
      ))}
    </g>
  );
}
