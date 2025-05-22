"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function PostDropdownMenu({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // 外側クリックでメニューを閉じる
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        boxRef.current &&
        e.target instanceof Node &&
        !boxRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={boxRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-2 py-1 border rounded-md focus:outline-none focus:ring"
      >
        ⋯
      </button>

      {open && (
        <ul className="absolute right-0 z-10 mt-1 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 text-sm">
          <li>
            <Link
              href={`/manage/posts/${postId}`}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              詳細
            </Link>
          </li>
          <li>
            <Link
              href={`/posts/edit/${postId}`}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              編集
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              削除
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
