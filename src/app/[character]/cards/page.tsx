import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Cards from "./component";

export default async function Page({
  params,
}: {
  params: { character: string };
}) {
  const characters = [
    "Lucifer",
    "Mammon",
    "Leviathan",
    "Satan",
    "Asmodeus",
    "Beelzebub",
    "Belphegor",
    "Diavolo",
    "Barbatos",
    "Luke",
    "Simeon",
    "Solomon",
    "Raphael",
    "Thirteen",
    "Mephistopheles",
    // "Little D.",
  ];
  if (!characters.includes(params.character)) {
    notFound();
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  let user: { id: string; cards: string[] } | null;

  if (error || !data?.user) {
    user = null;
  } else {
    const cards = await supabase.from("user_cards").select("card_name");
    user = {
      id: data.user.id,
      cards: cards.data ? cards.data.map((x) => x.card_name) : [],
    };
  }

  return <Cards character={params.character} user={user} />;
}
