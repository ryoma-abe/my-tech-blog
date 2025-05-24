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
        <Link href="/dashboard">
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white tracking-tight">
            My Blog
          </h1>
        </Link>
        <Setting session={session} />
      </div>
    </header>
  );
}
