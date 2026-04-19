import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useAuth } from "@/store/auth";
import { LogOut, Shield } from "lucide-react";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-30 border-b border-spider/30 bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-2 text-xs font-mono-ui">
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-1 rounded-md border border-amber/40 px-2.5 py-1.5 text-amber hover:bg-amber/10"
            >
              <Shield className="h-3 w-3" /> Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 hover:bg-surface-2"
            >
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md px-3 py-1.5 hover:text-cyan-edge"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-spider rounded-md px-3.5 py-1.5 font-display"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
