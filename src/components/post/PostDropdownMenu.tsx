"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import DeletePostDialog from "./DeletePostDialog";

export default function PostDropdownMenu({ postId }: { postId: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const handleDeleteDialogChange = (open: boolean) => {
    setShowDeleteDialog(open);
    if (!open) {
      setIsDropdownOpen(false);
    }
  };

  // 外側クリックでメニューを閉じる
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        boxRef.current &&
        e.target instanceof Node &&
        !boxRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <>
      <div ref={boxRef} className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsDropdownOpen((v) => !v)}
          className="px-2 py-1 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          ⋯
        </button>

        {isDropdownOpen && (
          <ul className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700 overflow-hidden text-sm">
            <li>
              <Link
                href={`/manage/posts/${postId}`}
                className="block px-4 py-2 text-zinc-700 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                onClick={() => setIsDropdownOpen(false)}
              >
                詳細
              </Link>
            </li>
            <li>
              <Link
                href={`/manage/posts/${postId}/edit`}
                className="block px-4 py-2 text-zinc-700 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                onClick={() => setIsDropdownOpen(false)}
              >
                編集
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setShowDeleteDialog(true);
                }}
              >
                削除
              </button>
            </li>
          </ul>
        )}
      </div>

      {showDeleteDialog && (
        <DeletePostDialog
          postId={postId}
          isOpen={showDeleteDialog}
          onOpenChange={handleDeleteDialogChange}
        />
      )}
    </>
  );
}
