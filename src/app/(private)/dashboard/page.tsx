import { auth } from "@/auth";
import { getOwnPosts } from "@/lib/ownPost";
import { tr } from "zod/v4/locales";

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
        <button className="bg-amber-200 p-4">新規記事作成</button>
      </div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th>タイトル</th>
            <th>表示/表示</th>
            <th>更新日時</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.published ? "表示" : "非表示"}</td>
              <td>{new Date(post.updatedAt).toLocaleString()}</td>
              <td>{/* ここにドロップダウンメニューがはいります */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
