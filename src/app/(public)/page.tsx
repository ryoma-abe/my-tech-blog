import { getPosts } from "@/lib/post";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-10 py-4">
      <h2 className="text-xl text-center font-bold mb-10 tracking-tight">
        記事一覧
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <article className="group cursor-pointer rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition">
              {post.topImage && (
                <div className="relative aspect-video">
                  <Image
                    src={post.topImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold tracking-tight group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {new Date(post.createdAt).toLocaleDateString()} by{" "}
                  {post.author?.name ?? "匿名"}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
