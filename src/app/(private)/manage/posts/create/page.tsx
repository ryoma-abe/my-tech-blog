"use client";
import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
export default function CreatePage() {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);

  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください"
          />
        </div>
        <div>
          <label htmlFor="">内容</label>
          <TextareaAutosize
            id="content"
            name="content"
            placeholder="Markdown形式で入力してください"
            minRows={8}
            value={content}
            onChange={handleOnchange}
          ></TextareaAutosize>
        </div>
        <div>文字数:{contentLength}</div>
      </form>
    </div>
  );
}
