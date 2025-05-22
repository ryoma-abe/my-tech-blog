"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
export default function CreatePage() {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);

  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
      <form className="space-y-6" action="">
        {/* タイトル */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください"
            className="w-full rounded-md border border-gray-300 p-3 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* 内容 */}
        <div className="space-y-2">
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            内容
          </label>
          <TextareaAutosize
            id="content"
            name="content"
            placeholder="Markdown形式で入力してください"
            minRows={8}
            value={content}
            onChange={handleOnchange}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* 文字数 */}
        <div className="text-right text-sm text-gray-500">
          文字数:{contentLength}
        </div>

        {/* プレビューボタン */}
        <div>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="rounded-md bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 transition"
          >
            {preview ? "プレビューを閉じる" : "プレビュー"}
          </button>
        </div>

        {/* プレビュー表示 */}
        {preview && (
          <div className="prose max-w-none rounded-md border p-6 bg-gray-50">
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
          className="w-full rounded-md bg-amber-400 px-6 py-3 font-semibold text-gray-800 hover:bg-amber-500 transition"
        >
          送信
        </button>
      </form>
    </div>
  );
}
