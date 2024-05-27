"use server";

import { createClient } from "@/utils/supabase/server";

export async function addCard(card: string) {
  const supabase = createClient();

  try {
    const user = await supabase.auth.getUser();

    if (user.error) throw user.error;

    const { error } = await supabase
      .from("user_cards")
      .insert({ user_id: user.data.user.id, card_name: card });

    if (error) throw error;
  } catch (e) {
    throw e;
  }
}

export async function removeCard(card: string) {
  const supabase = createClient();

  try {
    const user = await supabase.auth.getUser();

    if (user.error) throw user.error;

    const { error } = await supabase
      .from("user_cards")
      .delete()
      .match({ user_id: user.data.user.id, card_name: card });

    if (error) throw error;
  } catch (e) {
    throw e;
  }
}
