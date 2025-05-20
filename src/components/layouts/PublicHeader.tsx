export default function PublicHeader() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
        <nav className="space-x-6">
          <a href="/login" className="text-gray-600 hover:text-gray-900 transition">
            ログイン
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition">
            登録
          </a>
        </nav>
      </div>
    </header>
  );
}
