export default function PrivateHeader() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
        <nav className="space-x-6">
          <a
            href="/logout"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            ログアウト
          </a>
        </nav>
      </div>
    </header>
  );
}
