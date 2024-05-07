"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function login(formData: FormData) {
  const supabase = createClient();

  const parsedCredentials = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (parsedCredentials.success) {
    const { error } = await supabase.auth.signInWithPassword(
      parsedCredentials.data,
    );

    if (error) {
      return redirect("/login?message=" + error.message);
    }

    revalidatePath("/", "layout");
    return redirect("/account");
  }

  return redirect("/login?message=Invalid credentials");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const parsedCredentials = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (parsedCredentials.success) {
    const { error } = await supabase.auth.signUp(parsedCredentials.data);

    if (error) {
      return redirect("/signup?message=" + error.message);
    }

    revalidatePath("/", "layout");
    return redirect("/login");
  }

  return redirect(
    "/signup?message=" + parsedCredentials.error.issues[0].message,
  );
}
