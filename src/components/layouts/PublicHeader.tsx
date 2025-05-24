import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white tracking-tight">
          <Link href="/">My Blog</Link>
        </h1>
        <nav className="flex space-x-6">
          <Link
            href="/login"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition"
          >
            ログイン
          </Link>
          <Link
            href="/register"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition"
          >
            登録
          </Link>
        </nav>
      </div>
    </header>
  );
}
