import { signOut } from "@/auth";
import { Session } from "next-auth";
// session という名前の Session 型オブジェクトをpropsとして受け取る
export default function Setting({ session }: { session: Session }) {
  const handleLogout = async () => {
    "use server";
    await signOut();
  };
  return (
    <div className="flex">
      <p>こんにちは{session.user?.name}さん</p>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
}
