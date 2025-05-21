import { signOut } from "@/auth";
import { Session } from "next-auth";
// session という名前の Session 型オブジェクトをpropsとして受け取る
export default function Setting({ session }: { session: Session }) {
  return (
    <div className="flex">
      <p>こんにちは{session.user?.name}さん</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="p-4 bg-amber-300">
          ログアウト
        </button>
      </form>
    </div>
  );
}
