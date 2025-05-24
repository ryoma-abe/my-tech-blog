"use client";
import { useActionState, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { createPost } from "@/lib/actions/createPost";
export default function CreatePage() {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);
  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {},
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 mt-10">
      <form className="space-y-6" action={formAction}>
        {/* タイトル */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-zinc-300"
          >
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
          />
          {state.errors.title && (
            <p className="text-sm text-red-500">
              {state.errors.title.join(",")}
            </p>
          )}
        </div>

        {/* 画像保存 */}
        <div className="space-y-2">
          <label
            htmlFor="topImage"
            className="block text-sm font-medium text-zinc-300"
          >
            トップ画像
          </label>
          <input
            type="file"
            id="topImage"
            accept="image/*"
            name="topImage"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white file:text-white focus:border-zinc-500 focus:ring-zinc-500"
          />
          {state.errors.topImage && (
            <p className="text-sm text-red-500">
              {state.errors.topImage.join(",")}
            </p>
          )}
        </div>

        {/* 内容 */}
        <div className="space-y-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-zinc-300"
          >
            内容
          </label>
          <TextareaAutosize
            id="content"
            name="content"
            placeholder="Markdown形式で入力してください"
            minRows={8}
            value={content}
            onChange={handleOnchange}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
          />
          {state.errors.content && (
            <p className="text-sm text-red-500">
              {state.errors.content.join(",")}
            </p>
          )}
        </div>

        {/* 文字数 */}
        <div className="text-right text-sm text-zinc-400">
          文字数:{contentLength}
        </div>

        {/* プレビューボタン */}
        <div>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="rounded-md bg-zinc-700 px-4 py-2 text-white hover:bg-zinc-600 transition"
          >
            {preview ? "プレビューを閉じる" : "プレビュー"}
          </button>
        </div>

        {/* プレビュー表示 */}
        {preview && (
          <div className="prose max-w-none rounded-md border border-zinc-700 p-6 bg-zinc-800 text-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          className="w-full rounded-md bg-zinc-600 px-6 py-3 font-semibold text-white hover:bg-zinc-500 transition"
        >
          送信
        </button>
      </form>
    </div>
  );
}
