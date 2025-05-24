import { signOut } from "@/auth";
import { Session } from "next-auth";
// session という名前の Session 型オブジェクトをpropsとして受け取る
export default function Setting({ session }: { session: Session }) {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-zinc-700 dark:text-zinc-200">
        こんにちは {session.user?.name} さん
      </p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button
          type="submit"
          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
        >
          ログアウト
        </button>
      </form>
    </div>
  );
}
