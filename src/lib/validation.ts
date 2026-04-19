import { z } from "zod";

const teamNameRe = /^[A-Za-z0-9 ]+$/;
const lettersRe = /^[A-Za-z .'-]+$/;
const phoneRe = /^[6-9]\d{9}$/;
const alnumRe = /^[A-Za-z0-9]+$/;

export const step1Schema = z
  .object({
    team_name: z.string().min(2).max(50).regex(teamNameRe, "Letters, numbers and spaces only"),
    team_size: z.union([z.literal(4), z.literal(5), z.literal(6), z.string()]).transform((v) => Number(v) as 4 | 5 | 6),
    is_svce: z.boolean(),
    college_name: z.string().max(120).optional().or(z.literal("")),
    category: z.enum(["Hardware", "Software", "Industry Problem Statement"]),
    problem_statement_id: z.string().min(1).max(60),
    problem_statement_name: z.string().min(2).max(200),
    company_name: z.string().min(1).max(120),
  })
  .refine((v) => v.is_svce || (v.college_name && v.college_name.length >= 2), {
    path: ["college_name"],
    message: "College name required",
  });

export const memberSchema = z.object({
  full_name: z.string().min(2).max(80).regex(lettersRe, "Letters only"),
  department: z.string().min(2).max(40),
  department_other: z.string().max(60).optional().or(z.literal("")),
  year_of_study: z.enum(["1st", "2nd", "3rd", "4th"]),
  registration_number: z
    .string()
    .max(30)
    .regex(/^[A-Za-z0-9]*$/, "Alphanumeric only")
    .optional()
    .or(z.literal("")),
  phone_number: z.string().regex(phoneRe, "Enter valid 10-digit Indian mobile"),
  whatsapp_number: z.string().regex(phoneRe, "Enter valid 10-digit Indian mobile"),
  college_email: z.string().email().max(120),
  personal_email: z.string().email().max(120),
});

export const step2Schema = z.object({
  members: z.array(memberSchema).min(4).max(6),
});

export const step3Schema = z.object({
  mentor_name: z.string().min(2).max(80),
  mentor_department: z.string().min(2).max(80),
  mentor_designation: z.string().min(2).max(80),
  mentor_phone: z.string().regex(phoneRe, "Enter valid 10-digit Indian mobile"),
  mentor_email: z.string().email().max(120),
});

export const step5Schema = z.object({
  payment_transaction_id: z
    .string()
    .min(8, "Min 8 characters")
    .max(60)
    .regex(alnumRe, "Alphanumeric only"),
  payment_bank_name: z.string().min(2).max(80),
  payment_mobile_number: z.string().regex(phoneRe, "Enter valid 10-digit Indian mobile"),
  payment_account_holder_name: z.string().min(2).max(80).regex(lettersRe, "Letters only"),
  payment_amount_confirmed: z.literal(true, { message: "You must confirm the payment" }),
});

export const authRegisterSchema = z
  .object({
    full_name: z.string().min(2).max(80),
    email: z.string().email(),
    password: z.string().min(8, "Min 8 characters").max(72),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type Step1 = z.infer<typeof step1Schema>;
export type Step2 = z.infer<typeof step2Schema>;
export type Step3 = z.infer<typeof step3Schema>;
export type Step5 = z.infer<typeof step5Schema>;
export type Member = z.infer<typeof memberSchema>;

export const DEPARTMENTS = ["ECE", "CSE", "IT", "MECH", "CIVIL", "EEE", "AIDS", "AIML", "Other"] as const;
