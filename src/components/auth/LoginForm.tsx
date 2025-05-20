"use client";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions/authenticate";
export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="max-w-sm w-full mx-auto space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          パスワード
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        ログイン
      </button>
      <div className="h-6">
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    </form>
  );
}
