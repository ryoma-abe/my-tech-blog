import { auth } from "@/auth";
import PostDropdownMenu from "@/components/post/PostDropdownMenu";
import { getOwnPosts } from "@/lib/ownPost";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }
  const posts = await getOwnPosts(userId);
  return (
    <div>
      <div>
        <button className="bg-amber-200 p-4">
          <Link href="/manage/posts/create">新規記事作成</Link>
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              タイトル
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              表示/非表示
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              更新日時
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{post.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {post.published ? "表示" : "非表示"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(post.updatedAt).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <PostDropdownMenu postId={post.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
