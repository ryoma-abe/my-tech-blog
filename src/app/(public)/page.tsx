import { getPosts } from "@/lib/post";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        これはログイン無しのページ
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
