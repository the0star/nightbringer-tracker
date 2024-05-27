import CollectionPage from "./component";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Account() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect("/login");
  }

  const { data } = await supabase
    .from("cards")
    .select("name,type")
    .order("id", { ascending: false });

  const res = await supabase
    .from("user_cards")
    .select("card_name")
    .eq("user_id", user.id);
  const ownedCards = res.data ? res.data.map((x) => x.card_name) : [];

  return <CollectionPage cards={data} ownedCards={ownedCards} />;
  return <>{JSON.stringify(data)}</>;
}
