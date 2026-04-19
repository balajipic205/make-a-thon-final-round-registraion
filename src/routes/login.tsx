import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authLoginSchema } from "@/lib/validation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { LogIn } from "lucide-react";
import type { z } from "zod";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Login — Make-a-Thon 7.0" }],
  }),
});

type Form = z.infer<typeof authLoginSchema>;

function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(authLoginSchema) });

  const onSubmit = async (v: Form) => {
    setServerError(null);
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: v.email,
      password: v.password,
    });
    setSubmitting(false);
    if (error) {
      setServerError(error.message);
      return;
    }
    navigate({ to: "/register-team" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md panel rounded-2xl p-6 corner-frame">
          <div className="flex flex-col items-center text-center mb-6">
            <Logo />
            <h1 className="mt-4 font-display text-2xl">Sign in</h1>
            <p className="text-xs text-muted-foreground font-mono-ui mt-1">
              Access the registration portal
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                autoComplete="email"
                className="input"
                {...register("email")}
              />
            </Field>
            <Field label="Password" error={errors.password?.message}>
              <input
                type="password"
                autoComplete="current-password"
                className="input"
                {...register("password")}
              />
            </Field>
            {serverError && (
              <div className="text-sm text-destructive font-mono-ui">{serverError}</div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 font-display font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              <LogIn className="h-4 w-4" /> {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FieldStyles />
    </div>
  );
}

export function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-mono-ui uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </span>
      {children}
      {hint && !error && <span className="block text-xs text-muted-foreground mt-1">{hint}</span>}
      {error && (
        <span className="block text-xs text-destructive font-mono-ui mt-1">{error}</span>
      )}
    </label>
  );
}

export function FieldStyles() {
  return (
    <style>{`
      .input {
        width: 100%;
        background: var(--input);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 0.6rem 0.75rem;
        color: var(--foreground);
        font-family: var(--font-sans);
        min-height: 44px;
        transition: box-shadow 0.15s, border-color 0.15s;
      }
      .input:focus { outline: none; border-color: var(--primary);
        box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary) 30%, transparent); }
      .input::placeholder { color: color-mix(in oklab, var(--muted-foreground) 70%, transparent); }
      select.input { appearance: none; background-image: linear-gradient(45deg, transparent 50%, var(--primary) 50%),
                                                          linear-gradient(135deg, var(--primary) 50%, transparent 50%);
        background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
        background-size: 5px 5px, 5px 5px; background-repeat: no-repeat; padding-right: 2rem; }
    `}</style>
  );
}
