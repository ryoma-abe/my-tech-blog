import { auth } from "@/auth";
import PostDropdownMenu from "@/components/post/PostDropdownMenu";
import { getOwnPosts } from "@/lib/ownPosts";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }
  const posts = await getOwnPosts(userId);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6 flex justify-end">
        <Link
          href="/manage/posts/create"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
        >
          新規記事作成
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-lg border border-zinc-700 bg-white dark:bg-zinc-900 p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  {post.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {post.published ? "表示" : "非表示"}・
                  {new Date(post.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="relative shrink-0">
                <PostDropdownMenu postId={post.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
