import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata = {
  title: "About Us | Gifterbell",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-[#2aa89c]">
          &larr; Back to Home
        </Link>
        <h1 className="mb-8 text-3xl font-bold text-[#1a2748]">About Us</h1>

        <div className="prose prose-slate max-w-none text-slate-600 [&_p]:mb-6 [&_p]:leading-relaxed [&_p]:text-[16px]">
          <p>
            We built this company for people who care deeply about showing up for the people they care
            about &mdash; but don&rsquo;t want the work of remembering every date, planning every gift, researching
            options, and managing delivery. Life is busy. Gifting can still be thoughtful without becoming
            another task on your list.
          </p>
          <p>
            You tell us who you&rsquo;re shopping for, which occasions matter, and the budget you want to stay
            within. We keep track of upcoming dates, source gifts through third-party retailers, and help get
            them delivered on time. You can set up one-time gifts or recurring occasions, so important
            moments do not slip through the cracks.
          </p>
          <p>
            At our core, we&rsquo;re here to make gifting easier, more consistent, and less time-consuming, while
            still feeling personal for the people receiving it.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
