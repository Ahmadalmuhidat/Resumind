import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/" className="group flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]">
        <div className="size-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">R</span>
        </div>
        <p className="text-xl font-bold text-gradient tracking-tight">RESUMIND</p>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/about"
          className="px-4 py-2 rounded-full text-sm font-semibold text-brand-700 hover:bg-gray-100 transition-all active:scale-95"
        >
          About
        </Link>
        {auth.isAuthenticated && (
          <Link
            to="/resumes"
            className="px-4 py-2 rounded-full text-sm font-semibold text-brand-700 hover:bg-gray-100 transition-all active:scale-95"
          >
            My Resumes
          </Link>
        )}
        {!auth.isAuthenticated && (
          <Link
            to="/auth"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-brand-700 hover:bg-gray-100 transition-all active:scale-95"
          >
            <span>Login</span>
          </Link>
        )}
        <Link to="/upload" className="primary-button w-fit text-sm px-6 py-2.5 shadow-md">
          Upload Resume
        </Link>
        {auth.isAuthenticated && (
          <Link
            to="/auth"
            className="p-2.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all active:scale-95"
            title="Sign Out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;