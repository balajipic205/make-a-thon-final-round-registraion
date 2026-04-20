import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useAuth } from "@/store/auth";
import { LogOut, Shield } from "lucide-react";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-spider/30 bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3 min-h-[56px]">
        {/* Left-aligned logo */}
        <Link to="/" aria-label="Home" className="shrink-0">
          <Logo size="md" />
        </Link>

        {/* Right-aligned nav */}
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
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 hover:bg-surface-2 transition-colors"
            >
              <LogOut className="h-3 w-3" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-1.5 hover:text-cyan-edge transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-spider rounded-md px-3.5 py-1.5 font-display">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
