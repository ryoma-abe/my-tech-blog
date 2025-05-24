import { getPosts } from "@/lib/post";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-10 py-4">
      <h2 className="text-2xl text-center font-bold mb-12 tracking-tight text-white">
        記事一覧
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <article className="group cursor-pointer rounded-2xl overflow-hidden bg-zinc-800/60 border border-zinc-700 hover:shadow-2xl transition duration-300">
              {post.topImage && (
                <div className="relative aspect-video">
                  <Image
                    src={post.topImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 mt-2">
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
