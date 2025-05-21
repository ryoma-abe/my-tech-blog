import { auth } from "@/auth";
import { getOwnPosts } from "@/lib/ownPost";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }
  const posts = await getOwnPosts(userId);
  return (
    <div>
      <div>dashboard</div>
    </div>
  );
}
