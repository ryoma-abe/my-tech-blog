"use client";
import { useActionState } from "react";
import { createUser } from "@/lib/actions/createUser";

export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });
  return (
    <div>
      <h2>ユーザー登録</h2>
      <form action={formAction}>
        <div>
          <label htmlFor="name">名前</label>
          <input id="name" type="text" name="name" required />
          {state.errors.name && (
            <p className="text-red-500 mt-1">{state.errors.name.join(",")}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input id="email" type="email" name="email" required />
          {state.errors.email && (
            <p className="text-red-500 mt-1">{state.errors.email.join(",")}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input id="password" type="password" name="password" required />
          {state.errors.password && (
            <p className="text-red-500 mt-1">
              {state.errors.password.join(",")}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">パスワード確認</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
          />
          {state.errors.confirmPassword && (
            <p className="text-red-500 mt-1">
              {state.errors.confirmPassword.join(",")}
            </p>
          )}
        </div>
        <button type="submit" className="cursor-pointer">
          登録
        </button>
      </form>
    </div>
  );
}
