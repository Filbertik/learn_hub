const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-bold tracking-tight text-slate-900">
            Learn<span className="text-indigo-600">Hub</span>
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Learn new skills. Build your future.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
