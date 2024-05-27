import SignUp from "./component";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (data.user) {
    return redirect("/");
  }

  return <SignUp searchParams={searchParams} />;
}
