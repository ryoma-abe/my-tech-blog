import { getPost } from "@/lib/post";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-white tracking-tight">
        {post.title}
      </h2>

      {post.topImage && (
        <div className="relative aspect-video mb-10 rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
          <Image
            src={post.topImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-invert prose-zinc max-w-none prose-img:rounded-lg prose-img:shadow-md prose-code:bg-zinc-800">
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
