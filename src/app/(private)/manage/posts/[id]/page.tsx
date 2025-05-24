import { auth } from "@/auth";
import { getOwnPost } from "@/lib/ownPost";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function ShowPage({ params }: Params) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }
  const { id } = await params;
  const post = await getOwnPost(userId, id);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-white tracking-tight">
        {post.title}
      </h2>
      <div className="relative w-full h-64 rounded-xl overflow-hidden border border-zinc-700 shadow">
        {post.topImage && (
          <Image
            src={post.topImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="prose prose-invert prose-zinc mt-10 max-w-none text-zinc-200">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          skipHtml={false}
          unwrapDisallowed={true}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
