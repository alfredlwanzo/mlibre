import { auth } from "@/lib/auth";

export default async function WSDashboardPage() {
  const session = await auth();
  return <div>{session?.user?.username}</div>;
}
