export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
          Finance<span className="text-green-600">Dash</span>
        </h1>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-green-600 transition">
            Features
          </a>
          <a href="#" className="hover:text-green-600 transition">
            Pricing
          </a>
          <a href="#" className="hover:text-green-600 transition">
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
}
