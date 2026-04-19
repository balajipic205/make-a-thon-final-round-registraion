import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1 } from "@/lib/validation";
import { Field } from "@/routes/login";
import { clean } from "@/lib/sanitize";
import { useEffect } from "react";

export function Step1Form({
  defaultValues,
  onNext,
}: {
  defaultValues?: Partial<Step1>;
  onNext: (v: Step1) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      team_size: 4,
      is_svce: true,
      category: "Hardware",
      ...defaultValues,
    },
  });

  const isSvce = watch("is_svce");

  useEffect(() => {
    if (isSvce) setValue("college_name", "");
  }, [isSvce, setValue]);

  const submit = handleSubmit((v) => {
    onNext({
      ...v,
      team_name: clean(v.team_name),
      college_name: v.is_svce ? "Sri Venkateswara College of Engineering" : clean(v.college_name || ""),
      problem_statement_id: clean(v.problem_statement_id),
      problem_statement_name: clean(v.problem_statement_name),
      company_name: clean(v.company_name),
    });
  });

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field label="Team name" error={errors.team_name?.message}>
        <input className="input" maxLength={50} {...register("team_name")} />
      </Field>

      <Field label="Team size" error={errors.team_size?.message}>
        <select className="input" {...register("team_size", { valueAsNumber: true })}>
          <option value={4}>4 members</option>
          <option value={5}>5 members</option>
          <option value={6}>6 members</option>
        </select>
      </Field>

      <div>
        <span className="block text-xs font-mono-ui uppercase tracking-wider text-muted-foreground mb-2">
          College
        </span>
        <div className="grid grid-cols-2 gap-2">
          <label className={`cursor-pointer rounded-md border px-3 py-2.5 text-sm flex items-center gap-2 ${isSvce ? "border-primary bg-primary/10" : "border-border"}`}>
            <input
              type="radio"
              className="accent-primary"
              checked={isSvce}
              onChange={() => setValue("is_svce", true)}
            />
            SVCE
          </label>
          <label className={`cursor-pointer rounded-md border px-3 py-2.5 text-sm flex items-center gap-2 ${!isSvce ? "border-primary bg-primary/10" : "border-border"}`}>
            <input
              type="radio"
              className="accent-primary"
              checked={!isSvce}
              onChange={() => setValue("is_svce", false)}
            />
            Other college
          </label>
        </div>
        {!isSvce && (
          <div className="mt-3">
            <Field label="College name" error={errors.college_name?.message}>
              <input className="input" maxLength={120} {...register("college_name")} />
            </Field>
            <p className="text-xs text-muted-foreground mt-2 font-mono-ui">
              Note: inter-college teams are NOT allowed — all members must be from the same college.
            </p>
          </div>
        )}
      </div>

      <Field label="Category" error={errors.category?.message}>
        <select className="input" {...register("category")}>
          <option>Hardware</option>
          <option>Software</option>
          <option>Industry Problem Statement</option>
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Problem statement ID" error={errors.problem_statement_id?.message}>
          <input className="input" maxLength={60} {...register("problem_statement_id")} />
        </Field>
        <Field label="Company name" error={errors.company_name?.message}>
          <input className="input" maxLength={120} {...register("company_name")} />
        </Field>
      </div>

      <Field label="Problem statement name" error={errors.problem_statement_name?.message}>
        <input className="input" maxLength={200} {...register("problem_statement_name")} />
      </Field>

      <NextBar />
    </form>
  );
}

export function NextBar({ label = "Save & continue", disabled }: { label?: string; disabled?: boolean }) {
  return (
    <div className="sticky bottom-0 -mx-4 sm:mx-0 sm:static border-t border-border/60 bg-background/95 backdrop-blur px-4 py-3 sm:p-0 sm:border-0 sm:bg-transparent sm:backdrop-blur-0">
      <button
        type="submit"
        disabled={disabled}
        className="w-full sm:w-auto sm:ml-auto sm:flex inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-display font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 min-h-[44px]"
      >
        {label}
      </button>
    </div>
  );
}
