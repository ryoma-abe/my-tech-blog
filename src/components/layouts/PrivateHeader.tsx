import { auth } from "@/auth";
import Link from "next/link";
import Setting from "./Setting";

export default async function PrivateHeader() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("不正なリクエストです");
  }

  return (
    <header className="shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* ロゴ or トップリンク */}
        <Link href="/">
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white tracking-tight">
            My Blog
          </h1>
        </Link>

        {/* ナビゲーション */}
        <nav className="flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition"
          >
            ダッシュボード
          </Link>
          <Link
            href="/settings"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition"
          >
            設定
          </Link>
          <Link
            href="/logout"
            className="text-zinc-600 hover:text-red-500 dark:text-zinc-300 dark:hover:text-red-400 transition"
          >
            ログアウト
          </Link>

          {/* ユーザー設定（たとえばプロフィール画像や名前） */}
          <Setting session={session} />
        </nav>
      </div>
    </header>
  );
}
