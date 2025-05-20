import { Session } from "next-auth";
// session という名前の Session 型オブジェクトをpropsとして受け取る
export default function Setting({session}:{session:Session}) {
  return (
    <div>Setting</div>
  )
}
