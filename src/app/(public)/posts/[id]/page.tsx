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
    <div className="min-h-screen pt-20 px-4">
      <article className="max-w-3xl mx-auto">
        <h2 className="text-2xl text-center font-bold tracking-tight mb-6">
          {post.title}
        </h2>

        {post.topImage && (
          <div className="relative aspect-video mb-8 rounded-md overflow-hidden shadow-sm">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-zinc dark:prose-invert max-w-none prose-img:rounded-md prose-img:shadow-md prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800">
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
    </div>
  );
}
