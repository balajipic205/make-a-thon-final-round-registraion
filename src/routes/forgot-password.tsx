import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/validation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Field, FieldStyles } from "@/routes/login";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import type { z } from "zod";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
  head: () => ({
    meta: [{ title: "Forgot Password — Makeathon 7.0" }],
  }),
});

type Form = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(forgotPasswordSchema) });

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const onSubmit = async (v: Form) => {
    if (cooldown > 0) return;
    setServerError(null);
    setSubmitting(true);
    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(v.email, {
        redirectTo,
      });
      if (error) {
        // Note: Supabase intentionally does NOT reveal if the email exists.
        // Any error here is typically rate-limit or network.
        setServerError(error.message);
        setSubmitting(false);
        return;
      }
      setSent(true);
      setCooldown(60);
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
      setServerError(e instanceof Error ? e.message : "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex items-center justify-center px-4 py-8"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="w-full max-w-md panel rounded-2xl p-6 corner-frame">
          <div className="flex flex-col items-center text-center mb-6">
            <Logo size="lg" />
            <h1 className="mt-4 font-display text-2xl">Reset Password</h1>
            <p className="text-xs text-muted-foreground font-mono-ui mt-1 uppercase tracking-wider">
              We'll email you a secure reset link
            </p>
          </div>

          {sent ? (
            <div className="space-y-4">
              <div className="flex items-start gap-2 rounded-md border border-green-500/40 bg-green-500/10 p-3 text-sm">
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-green-500" />
                <div>
                  <div className="font-display font-semibold mb-1">Check your inbox</div>
                  <div className="text-muted-foreground text-xs font-mono-ui">
                    If an account exists with that email, a reset link has been sent. Check your
                    spam folder if you don't see it within a minute.
                  </div>
                </div>
              </div>
              <button
                type="button"
                disabled={cooldown > 0}
                onClick={() => setSent(false)}
                className="w-full btn-spider inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-display font-semibold disabled:opacity-50 min-h-[44px]"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Send another email"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  autoComplete="email"
                  className="input"
                  placeholder="teamlead@gmail.com"
                  {...register("email")}
                />
              </Field>
              {serverError && (
                <div className="text-sm text-destructive font-mono-ui">{serverError}</div>
              )}
              <button
                type="submit"
                disabled={submitting || cooldown > 0}
                className="w-full btn-spider inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-display font-semibold disabled:opacity-50 min-h-[44px]"
              >
                <Mail className="h-4 w-4" />
                {submitting
                  ? "Sending..."
                  : cooldown > 0
                    ? `Wait ${cooldown}s`
                    : "Send reset link"}
              </button>
            </form>
          )}

          <div className="mt-4 text-center text-sm">
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-cyan-edge hover:underline"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to sign in
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FieldStyles />
    </div>
  );
}
