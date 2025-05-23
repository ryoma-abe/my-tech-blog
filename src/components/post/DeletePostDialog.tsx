import { deletePost } from "@/lib/actions/deletePost";
import { useEffect } from "react";

type DeletePostProps = {
  postId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeletePostDialog({
  postId,
  isOpen,
  onOpenChange,
}: DeletePostProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onOpenChange]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">投稿を削除しますか？</h2>
        <p className="text-sm text-gray-600 mb-6">
          この操作は取り消せません。本当に削除してもよろしいですか？
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            onClick={() => deletePost(postId)}
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  );
}
