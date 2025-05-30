"use client";
import { useActionState, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css";

import Image from "next/image";
import { updatePost } from "@/lib/actions/updatePost";

type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    content: string;
    topImage?: string | null;
    published: boolean;
  };
};

export default function EditPostForm({ post }: EditPostFormProps) {
  const [content, setContent] = useState(post.content);
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);
  const [imagePreview, setImagePreview] = useState(post.topImage);
  const [state, formAction] = useActionState(updatePost, {
    success: false,
    errors: {},
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // プレビュー用URL生成 ブラウザのメモリに保存される
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  // プレビューURLはブラウザのメモリに保存される
  // コンポーネントが破棄されるかimagePreview変更時に プレビューURLを解放
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== post.topImage) {
        URL.revokeObjectURL(imagePreview); // プレビューurlはブラウザのメモリに保存される
      }
    };
  }, [imagePreview, post.topImage]);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={handleImageChange}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white file:text-white focus:border-zinc-500 focus:ring-zinc-500"
          />
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt={post.title}
                width={0}
                height={0}
                sizes="200px"
                className="w-[200px] rounded-md shadow"
                priority
              />
            </div>
          )}
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
            className="rounded-md bg-zinc-600 px-4 py-2 text-white hover:bg-zinc-500 transition"
          >
            {preview ? "プレビューを閉じる" : "プレビュー"}
          </button>
        </div>

        {/* プレビュー表示 */}
        {preview && (
          <div className="prose prose-invert prose-zinc max-w-none prose-h2:text-4xl prose-h2:mb-8 prose-h2:tracking-tight">
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

        {/* 表示・非表示の選択 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            公開状態
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-zinc-300">
              <input
                type="radio"
                name="published"
                value="true"
                checked={published === true}
                onChange={() => setPublished(true)}
                className="accent-zinc-400"
              />
              <span>表示</span>
            </label>
            <label className="flex items-center space-x-2 text-zinc-300">
              <input
                type="radio"
                name="published"
                value="false"
                checked={published === false}
                onChange={() => setPublished(false)}
                className="accent-zinc-400"
              />
              <span>非表示</span>
            </label>
          </div>
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          className="w-full rounded-md bg-zinc-500 px-6 py-3 font-semibold text-white hover:bg-zinc-400 transition"
        >
          更新する
        </button>

        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="oldImageUrl" value={post.topImage || ""} />
        <input type="hidden" name="published" value={published.toString()} />
      </form>
    </div>
  );
}
