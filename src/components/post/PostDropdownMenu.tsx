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
          className="px-2 py-1 border rounded-md focus:outline-none focus:ring"
        >
          ⋯
        </button>
        {isDropdownOpen && (
          <ul className="absolute right-0 z-10 mt-1 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 text-sm">
            <li>
              <Link
                href={`/manage/posts/${postId}`}
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                詳細
              </Link>
            </li>
            <li>
              <Link
                href={`/manage/posts/${postId}/edit`}
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                編集
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
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
