import { auth } from "@/auth";
import Link from "next/link";
import Setting from "./Setting";

export default async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("不正なリクエストです");
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
        <nav className="space-x-6">
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            管理ページ
          </Link>
          <Setting session={session} />
        </nav>
      </div>
    </header>
  );
}
