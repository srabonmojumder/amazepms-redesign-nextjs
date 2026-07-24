"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { segments } from "@/data/segments";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success";

type Fields = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  propertyType: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  propertyType: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Tell us who to address.";
  if (!f.organization.trim()) e.organization = "Which property or company?";
  if (!f.email.trim()) e.email = "We need a way to reply.";
  else if (!EMAIL_RE.test(f.email)) e.email = "That email doesn't look right.";
  if (!f.propertyType) e.propertyType = "Pick the closest match.";
  if (!f.message.trim()) e.message = "A line or two on what you need.";
  else if (f.message.trim().length < 10) e.message = "A little more detail helps.";
  return e;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [ref] = useState(
    () => `REQ-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
  );

  const update = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (touched[key]) {
      setErrors(validate({ ...fields, [key]: value }));
    }
  };

  const handleBlur = (key: keyof Fields) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(fields));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eObj = validate(fields);
    setErrors(eObj);
    setTouched({
      name: true,
      organization: true,
      email: true,
      phone: true,
      propertyType: true,
      message: true,
    });
    if (Object.keys(eObj).length > 0) {
      // Move focus to the first invalid field.
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("submitting");
    // Demo submission: no backend wired — simulate a network round-trip.
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  return (
    <div className="tick-corner relative rounded-panel border border-ink-600 bg-ink-800 p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.entrance }}
            className="flex min-h-[24rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-amber/50 bg-amber/10">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-amber" fill="none" aria-hidden>
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-bone-100">
              Request logged
            </h3>
            <p className="mt-3 max-w-sm text-bone-300">
              Thanks, {fields.name.split(" ")[0] || "there"}. Our team will reach
              out within one business day to schedule your site survey.
            </p>
            <p className="mt-6 font-mono text-micro uppercase tracking-widest text-slate-500">
              Reference // <span className="text-amber">{ref}</span>
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Your name"
                value={fields.name}
                error={errors.name}
                onChange={(v) => update("name", v)}
                onBlur={() => handleBlur("name")}
                autoComplete="name"
              />
              <Field
                id="organization"
                label="Property / company"
                value={fields.organization}
                error={errors.organization}
                onChange={(v) => update("organization", v)}
                onBlur={() => handleBlur("organization")}
                autoComplete="organization"
              />
              <Field
                id="email"
                label="Work email"
                type="email"
                value={fields.email}
                error={errors.email}
                onChange={(v) => update("email", v)}
                onBlur={() => handleBlur("email")}
                autoComplete="email"
              />
              <Field
                id="phone"
                label="Phone (optional)"
                type="tel"
                value={fields.phone}
                error={errors.phone}
                onChange={(v) => update("phone", v)}
                onBlur={() => handleBlur("phone")}
                autoComplete="tel"
                optional
              />
            </div>

            <SelectField
              id="propertyType"
              label="Property type"
              value={fields.propertyType}
              error={errors.propertyType}
              onChange={(v) => update("propertyType", v)}
              onBlur={() => handleBlur("propertyType")}
              options={segments.map((s) => s.label)}
            />

            <TextareaField
              id="message"
              label="What do you need?"
              value={fields.message}
              error={errors.message}
              onChange={(v) => update("message", v)}
              onBlur={() => handleBlur("message")}
            />

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group/btn mt-1 inline-flex h-14 items-center justify-center gap-2 rounded-pill bg-amber px-7 font-display font-semibold tracking-tight text-ink-900 transition-all duration-micro ease-transform hover:bg-amber-300 disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900/30 border-t-ink-900" />
                  Sending…
                </>
              ) : (
                <>
                  Request site survey
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-micro ease-transform group-hover/btn:translate-x-0.5" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
            <p className="font-mono text-[0.5625rem] uppercase tracking-widest text-slate-500">
              Demo form · client-side only · no data leaves your browser
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- Field primitives ---- */

const labelCls = "mb-2 block font-mono text-micro uppercase tracking-widest text-slate-400";
const inputCls =
  "w-full rounded-card border bg-ink-900 px-4 py-3 text-bone-100 placeholder:text-slate-600 transition-colors duration-micro focus:outline-none";

function fieldBorder(error?: string) {
  return error
    ? "border-signal-alert focus:border-signal-alert"
    : "border-ink-600 focus:border-amber";
}

function ErrorMsg({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-caption text-signal-alert"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  optional,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required={!optional}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputCls, fieldBorder(error))}
      />
      <ErrorMsg id={id} error={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  options,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputCls, fieldBorder(error), !value && "text-slate-600")}
      >
        <option value="" disabled>
          Select a property type…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-bone-100">
            {o}
          </option>
        ))}
      </select>
      <ErrorMsg id={id} error={error} />
    </div>
  );
}

function TextareaField({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={4}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputCls, fieldBorder(error), "resize-none")}
      />
      <ErrorMsg id={id} error={error} />
    </div>
  );
}
