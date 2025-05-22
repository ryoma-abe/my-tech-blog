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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-[#333333]">{post.title}</h2>
        <div className="relative w-full h-64">
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
        <div className="prose prose-gray mt-8">
          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
      );
    </div>
  );
}
