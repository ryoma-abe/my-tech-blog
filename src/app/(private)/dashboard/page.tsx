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

      <div className="rounded-md shadow border border-zinc-700">
        <table className="min-w-full text-sm text-left bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
          <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">タイトル</th>
              <th className="px-4 py-3">表示/非表示</th>
              <th className="px-4 py-3">更新日時</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
              >
                <td className="px-4 py-3">{post.title}</td>
                <td className="px-4 py-3">
                  {post.published ? "表示" : "非表示"}
                </td>
                <td className="px-4 py-3">
                  {new Date(post.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 relative">
                  {/* PostDropdownMenu内では absolute + z-50 を設定 */}
                  <PostDropdownMenu postId={post.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
