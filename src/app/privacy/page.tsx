import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata = {
  title: "Privacy Policy | Gifterbell",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-[#2aa89c]">
          &larr; Back to Home
        </Link>
        <h1 className="mb-8 text-3xl font-bold text-[#1a2748]">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-slate-400 italic">This page is under construction. Our full Privacy Policy will be available soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
