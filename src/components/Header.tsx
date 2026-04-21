import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useAuth } from "@/store/auth";
import { LogOut, Shield, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const email = user?.email ?? "";
  const initial = email ? email.charAt(0).toUpperCase() : "?";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 pl-1 pr-3 py-1 hover:bg-surface-2 transition-colors"
                  aria-label="Account menu"
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white ${
                      isAdmin ? "bg-amber" : "bg-spider"
                    }`}
                  >
                    {initial}
                  </span>
                  <span className="hidden sm:inline max-w-[140px] truncate text-foreground">
                    {email}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="font-mono-ui">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Signed in as
                      </div>
                      <div className="truncate text-xs text-foreground">{email}</div>
                      <div
                        className={`mt-1 inline-block rounded-sm px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${
                          isAdmin
                            ? "bg-amber/15 text-amber"
                            : "bg-spider/15 text-spider"
                        }`}
                      >
                        {isAdmin ? "Administrator" : "Team Account"}
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate({ to: "/admin/dashboard" })}>
                    <Shield className="mr-2 h-3.5 w-3.5 text-amber" /> Admin dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-3.5 w-3.5" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
