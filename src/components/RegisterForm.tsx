"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { register, type RegisterState } from "@/lib/actions";

type EntityKind = "individual" | "entity";

const ENTITY_TYPES: { value: string; label: string; kind: EntityKind }[] = [
  {
    value: "individual",
    label: "Individual: Individual Applicant or Proprietorship Firms",
    kind: "individual",
  },
  { value: "partnership", label: "Partnership Firms", kind: "entity" },
  { value: "llp", label: "Limited Liability Partnership (LLP)", kind: "entity" },
  { value: "company", label: "Companies", kind: "entity" },
  {
    value: "psu",
    label: "PSU: Government Entities (Other than SWC)",
    kind: "entity",
  },
  { value: "swc", label: "State Warehousing Corporation (SWC)", kind: "entity" },
  { value: "trust", label: "Trust / Society / Co-operative", kind: "entity" },
];

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-gray-700">
      {children}
      {required ? <span className="text-red-500">*</span> : null}
    </label>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-5 text-sm font-semibold text-gray-900">{children}</h3>
  );
}

function NameRow() {
  return (
    <div className="mt-3 grid grid-cols-3 gap-3">
      <Field name="firstName" label="First Name" required />
      <Field name="middleName" label="Middle Name" />
      <Field name="lastName" label="Last Name" required />
    </div>
  );
}

function CaptchaRow() {
  return (
    <div className="mt-3 grid grid-cols-2 items-end gap-3">
      <Field name="captcha" label="Text Verification" required />
      <div
        aria-label="Captcha image"
        className="flex h-10 items-center justify-center rounded-md bg-gray-200 text-sm tracking-widest text-gray-500 select-none"
      >
        7K2x9
      </div>
    </div>
  );
}

function ConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 -mx-6 -mb-6 h-12 rounded-b-xl bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Submitting…" : "Confirm"}
    </button>
  );
}

export default function RegisterForm() {
  const [state, formAction] = useActionState<RegisterState, FormData>(
    register,
    {},
  );
  const [entityType, setEntityType] = useState(ENTITY_TYPES[0].value);

  const kind =
    ENTITY_TYPES.find((t) => t.value === entityType)?.kind ?? "individual";

  return (
    <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>
      <p className="text-xs text-gray-500">
        Create Your Warehouse Operator Account
      </p>

      <form action={formAction} className="flex flex-col">
        <SectionHeading>
          {kind === "individual" ? "Applicant Details" : "Entity Details"}
        </SectionHeading>

        <div className="mt-3">
          <Label htmlFor="entityType">Select Your Entity Type</Label>
          <select
            id="entityType"
            name="entityType"
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {ENTITY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {kind === "individual" ? (
          <>
            <NameRow />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field name="fullName" label="Full Name (as per PAN)" required />
              <Field
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                required
              />
            </div>

            <SectionHeading>Contact Details</SectionHeading>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field
                name="email"
                label="Communication Email"
                type="email"
                required
              />
              <Field
                name="mobile"
                label="Applicant Mobile Number"
                type="tel"
                required
              />
            </div>
            <div className="mt-3">
              <Field name="pan" label="Applicant PAN" required />
            </div>
          </>
        ) : (
          <>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field
                name="entityName"
                label="Entity Name as per PAN"
                required
              />
              <Field
                name="dateOfIncorporation"
                label="Date of Incorporation"
                type="date"
                required
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field name="pan" label="PAN of Entity" required />
              <div />
            </div>

            <SectionHeading>Authorised Representative Details</SectionHeading>
            <NameRow />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field
                name="email"
                label="Communication Email"
                type="email"
                required
              />
              <Field
                name="mobile"
                label="Mobile Number"
                type="tel"
                required
              />
            </div>
          </>
        )}

        <div className="mt-3 grid grid-cols-2 gap-3">
          <Field
            name="password"
            label="Password"
            type="password"
            required
          />
          <Field
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required
          />
        </div>

        <CaptchaRow />

        {state.error ? (
          <p
            role="alert"
            className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {state.error}
          </p>
        ) : null}

        <ConfirmButton />
      </form>
    </div>
  );
}
