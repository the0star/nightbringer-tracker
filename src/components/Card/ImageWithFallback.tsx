"use client";
import { useState } from "react";
import Image from "next/image";

function getImageURL(name: string, type: "original" | "bloomed") {
  // const exclusive_cards: string[] = [];
  // const exclusive = exclusive_cards.includes(name) ? "" : "_(NB)";
  const exclusive = "";
  const unlocked = type === "original" ? "" : "_(Unlocked)";
  return `https://obeymewiki.com/wiki/Special:Redirect/file/${name}${unlocked}${exclusive}.png`;
}

export default function ImageWithFallback({
  name,
  type,
}: {
  name: string;
  type: "original" | "bloomed";
}) {
  const [imgSrc, setImgSrc] = useState(getImageURL(name, type));

  return (
    <Image
      src={imgSrc}
      alt={name + " " + type}
      onError={() => {
        setImgSrc("https://karasu-os.com/images/card_placeholder.jpg");
      }}
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
      }}
      width={1}
      height={1}
    />
  );
}
