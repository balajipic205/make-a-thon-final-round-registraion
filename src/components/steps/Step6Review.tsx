import { useState } from "react";
import type { RegState } from "@/store/registration";
import { POC_CONTACTS } from "@/lib/contacts";
import { CheckCircle2, MessageCircle, Phone, AlertTriangle } from "lucide-react";

export function Step6Review({
  state,
  onSubmit,
  onBack,
  submitting,
  serverError,
}: {
  state: RegState;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
  serverError: string | null;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [showModal, setShowModal] = useState(false);

  const s1 = state.step1!;
  const s2 = state.step2!;
  const s3 = state.step3!;
  const s4 = state.step4!;
  const s5 = state.step5!;

  const handleSubmit = () => {
    if (honeypot) {
      // silently reject
      return;
    }
    setShowModal(true);
  };

  const whatsapp = import.meta.env.VITE_WHATSAPP_GROUP_URL as string;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-xl">Review & submit</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Verify everything below. Once submitted, the registration cannot be edited.
        </p>
      </div>

      <SummaryCard title="Team">
        <Row label="Team name" value={s1.team_name} />
        <Row label="Size" value={`${s1.team_size} members`} />
        <Row label="College" value={s1.is_svce ? "SVCE" : s1.college_name || "Other"} />
        <Row label="Category" value={s1.category} />
        <Row label="Problem ID" value={s1.problem_statement_id} />
        <Row label="Problem name" value={s1.problem_statement_name} />
        <Row label="Company" value={s1.company_name} />
      </SummaryCard>

      <SummaryCard title="Members">
        <div className="space-y-3">
          {s2.members.map((m, i) => (
            <div key={i} className="rounded-md border border-border p-3">
              <div className="text-xs font-mono-ui text-muted-foreground">
                M{i + 1} {i === 0 && "· Team Leader"}
              </div>
              <div className="font-medium">{m.full_name}</div>
              <div className="text-sm text-muted-foreground">
                {m.department} · Year {m.year_of_study} · {m.college_email}
              </div>
            </div>
          ))}
        </div>
      </SummaryCard>

      <SummaryCard title="Mentor">
        <Row label="Name" value={s3.mentor_name} />
        <Row label="Department" value={s3.mentor_department} />
        <Row label="Designation" value={s3.mentor_designation} />
        <Row label="Phone" value={s3.mentor_phone} />
        <Row label="Email" value={s3.mentor_email} />
      </SummaryCard>

      <SummaryCard title="Photos">
        <div className="grid gap-3 sm:grid-cols-2">
          {s2.members.map((member, i) => {
            const photo = s4.photos[i];
            return (
              <div key={i} className="rounded-md border border-border bg-surface-2/40 p-3">
                <div className="flex items-start gap-3">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-surface-2">
                    {photo?.url ? (
                      <img src={photo.url} alt={member.full_name} className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="text-xs font-mono-ui text-muted-foreground">
                      M{i + 1} {i === 0 && "· Team Leader"}
                    </div>
                    <div className="font-medium">{member.full_name}</div>
                    <div className="text-sm text-muted-foreground break-words">
                      {member.department} · Year {member.year_of_study}
                    </div>
                    <div className="text-sm text-muted-foreground break-all">{member.college_email}</div>
                    <div className="text-xs font-mono-ui text-muted-foreground">
                      Phone: {member.phone_number}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SummaryCard>

      <SummaryCard title="Payment">
        <Row label="Transaction ID" value={s5.payment_transaction_id} />
        <Row label="Bank" value={s5.payment_bank_name} />
        <Row label="Mobile" value={s5.payment_mobile_number} />
        <Row label="Account holder" value={s5.payment_account_holder_name} />
        {s5.payment_screenshot_url && (
          <div className="mt-2">
            <div className="text-xs font-mono-ui text-muted-foreground mb-1">Screenshot</div>
            <img
              src={s5.payment_screenshot_url}
              alt="Payment screenshot"
              className="max-h-48 rounded border border-border"
            />
          </div>
        )}
      </SummaryCard>

      {/* WhatsApp */}
      <div className="panel rounded-xl p-4 corner-frame">
        <div className="font-display font-semibold mb-2">Join the official WhatsApp group</div>
        <p className="text-sm text-muted-foreground mb-3">
          All event updates will be shared here. Mandatory for the team leader.
        </p>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-success px-4 py-2 text-background font-medium hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" /> Join WhatsApp group
        </a>
      </div>

      {/* POC contacts */}
      <div className="panel rounded-xl p-4 corner-frame">
        <div className="font-display font-semibold mb-3">Point of contact</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {POC_CONTACTS.map((c) => (
            <a
              key={c.phone}
              href={`tel:${c.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 hover:border-primary/60"
            >
              <Phone className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <div className="font-medium">
                  {c.name}
                  {c.role && <span className="text-amber font-mono-ui text-xs"> · {c.role}</span>}
                </div>
                <div className="text-xs font-mono-ui text-muted-foreground">{c.phone}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="hp_company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: 0, height: 0, opacity: 0 }}
        aria-hidden
      />

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          className="mt-1 accent-primary"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <span>I confirm that all the above information is accurate and complete.</span>
      </label>

      {serverError && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive font-mono-ui inline-flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 mt-0.5" /> {serverError}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-border px-4 py-2.5 hover:bg-surface-2 min-h-[44px]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!confirmed || submitting}
          className="ml-auto inline-flex items-center justify-center gap-2 rounded-md bg-amber px-6 py-3 font-display font-semibold text-amber-foreground hover:opacity-90 disabled:opacity-50 min-h-[44px]"
        >
          <CheckCircle2 className="h-4 w-4" /> Submit registration
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur p-4">
          <div className="w-full max-w-md panel rounded-2xl p-6 corner-frame">
            <h3 className="font-display text-xl">Final confirmation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Submitting will lock your registration. You won't be able to edit it. Continue?
            </p>
            <div className="mt-5 flex gap-2 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md border border-border px-4 py-2 hover:bg-surface-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  onSubmit();
                }}
                disabled={submitting}
                className="rounded-md bg-amber px-4 py-2 text-amber-foreground hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Yes, submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel rounded-xl p-4 corner-frame">
      <div className="font-mono-ui text-xs uppercase tracking-wider text-primary mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}
function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-3 py-1 text-sm border-b border-border/40 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value || "—"}</span>
    </div>
  );
}
