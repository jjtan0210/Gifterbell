"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = firstName.trim() && lastName.trim() && email.trim() && message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: wire up to backend
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <Link href="/" className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-[#2aa89c]">
          &larr; Back to Home
        </Link>
        <h1 className="mb-2 text-3xl font-bold text-[#1a2748]">Contact Us</h1>
        <p className="mb-8 text-sm text-slate-500">
          Have a question or need help with an order? Fill out the form below and we&rsquo;ll get back to you as soon as possible.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-[#1a2748]">Message Sent!</h2>
            <p className="text-sm text-slate-500">
              Thank you for reaching out. We&rsquo;ll get back to you at <strong>{email}</strong> as soon as we can.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-[#1a2748]">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1a2748] outline-none transition focus:border-[#2aa89c] focus:ring-2 focus:ring-[#2aa89c]/20"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-[#1a2748]">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1a2748] outline-none transition focus:border-[#2aa89c] focus:ring-2 focus:ring-[#2aa89c]/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#1a2748]">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1a2748] outline-none transition focus:border-[#2aa89c] focus:ring-2 focus:ring-[#2aa89c]/20"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#1a2748]">
                How can we help? <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                rows={5}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1a2748] outline-none transition focus:border-[#2aa89c] focus:ring-2 focus:ring-[#2aa89c]/20"
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full rounded-full bg-[#2aa89c] py-3 text-sm font-semibold text-white transition hover:bg-[#239085] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
