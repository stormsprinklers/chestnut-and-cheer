"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CareerJob } from "@/lib/careers";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3 text-base text-chestnut shadow-sm placeholder:text-chestnut/40 focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red/15";

export function CareersApplication({ jobs }: { jobs: CareerJob[] }) {
  const router = useRouter();
  const [role, setRole] = useState(jobs.find((job) => job.applicationsOpen)?.slug ?? "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const canProceed = Boolean(role && firstName.trim() && lastName.trim() && email.trim() && phone.trim());

  function continueToApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canProceed) return;
    const params = new URLSearchParams({
      first: firstName.trim(),
      last: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
    router.push(`/careers/${role}?${params.toString()}#apply`);
  }

  return (
    <form
      onSubmit={continueToApplication}
      className="rounded-[2rem] border border-chestnut/10 bg-white p-5 shadow-2xl shadow-chestnut/15 sm:p-8"
      data-analytics-form="careers_get_started"
    >
      <p className="text-xs font-bold uppercase tracking-[.18em] text-primary-red">Quick application</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-chestnut">Start your application</h2>
      <p className="mt-2 text-sm leading-relaxed text-chestnut/70">
        Choose a role and tell us how to reach you. You&apos;ll answer four short questions on the next page.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block text-sm font-semibold text-chestnut">
          Which role are you applying for? *
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
            className={inputClass}
          >
            <option value="">Select a role</option>
            {jobs.filter((job) => job.applicationsOpen).map((job) => (
              <option key={job.slug} value={job.slug}>{job.jobTitle}</option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-chestnut">
            First name *
            <input className={inputClass} type="text" autoComplete="given-name" required maxLength={80} value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </label>
          <label className="block text-sm font-semibold text-chestnut">
            Last name *
            <input className={inputClass} type="text" autoComplete="family-name" required maxLength={80} value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </label>
        </div>

        <label className="block text-sm font-semibold text-chestnut">
          Email *
          <input className={inputClass} type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="block text-sm font-semibold text-chestnut">
          Phone *
          <input className={inputClass} type="tel" autoComplete="tel" required maxLength={40} value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
      </div>

      <button
        type="submit"
        disabled={!canProceed}
        className="mt-6 min-h-12 w-full rounded-full bg-primary-red px-6 py-3 font-semibold text-warm-white shadow-lg shadow-primary-red/15 transition hover:bg-primary-red/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut disabled:cursor-not-allowed disabled:opacity-45"
      >
        Continue Application
      </button>
    </form>
  );
}
