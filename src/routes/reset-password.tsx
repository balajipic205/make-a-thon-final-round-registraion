import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/validation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Field, FieldStyles } from "@/routes/login";
import { KeyRound, ShieldAlert, CheckCircle2 } from "lucide-react";
import type { z } from "zod";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({
    meta: [{ title: "Set New Password — Makeathon 7.0" }],
  }),
});

type Form = z.infer<typeof resetPasswordSchema>;

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [linkInvalid, setLinkInvalid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(resetPasswordSchema) });

  // Wait for Supabase to process the recovery hash from the email link
  useEffect(() => {
    let resolved = false;

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        resolved = true;
        setRecoveryReady(true);
      }
    });

    // Also check if a session already exists (link already processed)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        resolved = true;
        setRecoveryReady(true);
      }
    });

    // If after 3s nothing fires, the link is invalid/expired
    const timer = setTimeout(() => {
      if (!resolved) setLinkInvalid(true);
    }, 3000);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const onSubmit = async (v: Form) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: v.password });
      if (error) {
        setServerError(error.message);
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      setSubmitting(false);
      // Sign out so the user must log in fresh with new password
      await supabase.auth.signOut();
      setTimeout(() => navigate({ to: "/login" }), 2500);
    } catch (e) {
      setSubmitting(false);
      setServerError(e instanceof Error ? e.message : "Failed to update password");
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
            <h1 className="mt-4 font-display text-2xl">Set New Password</h1>
            <p className="text-xs text-muted-foreground font-mono-ui mt-1 uppercase tracking-wider">
              Choose a strong password
            </p>
          </div>

          {success ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2 rounded-md border border-cyan-edge/40 bg-cyan-edge/10 p-3 text-sm">
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-cyan-edge" />
                <div>
                  <div className="font-display font-semibold mb-1">Password updated</div>
                  <div className="text-muted-foreground text-xs font-mono-ui">
                    Redirecting to sign in...
                  </div>
                </div>
              </div>
            </div>
          ) : linkInvalid && !recoveryReady ? (
            <div className="space-y-4">
              <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive font-mono-ui">
                <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  This reset link is invalid or has expired. Please request a new one.
                </span>
              </div>
              <Link
                to="/forgot-password"
                className="block w-full text-center btn-spider rounded-md px-4 py-2.5 font-display font-semibold min-h-[44px] leading-6"
              >
                Request new link
              </Link>
            </div>
          ) : !recoveryReady ? (
            <div className="text-center text-sm text-muted-foreground font-mono-ui py-8">
              Verifying reset link...
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field
                label="New Password"
                error={errors.password?.message}
                hint="Minimum 8 characters"
              >
                <input
                  type="password"
                  autoComplete="new-password"
                  className="input"
                  placeholder="Enter new password"
                  {...register("password")}
                />
              </Field>
              <Field label="Confirm Password" error={errors.confirm?.message}>
                <input
                  type="password"
                  autoComplete="new-password"
                  className="input"
                  placeholder="Re-enter new password"
                  {...register("confirm")}
                />
              </Field>
              {serverError && (
                <div className="text-sm text-destructive font-mono-ui">{serverError}</div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-spider inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-display font-semibold disabled:opacity-50 min-h-[44px]"
              >
                <KeyRound className="h-4 w-4" />
                {submitting ? "Updating..." : "Update password"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
      <FieldStyles />
    </div>
  );
}
