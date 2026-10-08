import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          Learn<span className="text-indigo-600">Hub</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/courses"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Courses
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-slate-700 transition hover:text-indigo-600 sm:block"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
