"use client";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions/authenticate";
export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input id="email" type="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input id="password" type="password" name="password" required />
      </div>
      <button type="submit">ログイン</button>
      <div className="flex h-8 items-end space-x-1">
        {errorMessage && (
          <div className=" text-red-500">
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    </form>
  );
}
