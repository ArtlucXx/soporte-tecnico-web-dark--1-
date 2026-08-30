import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAbout, getMessages } from "@/lib/db";
import AdminPanel from "@/components/AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  const about = await getAbout();
  const messages = await getMessages();

  return <AdminPanel about={about} messages={messages} />;
}
