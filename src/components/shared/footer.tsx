import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a2748] py-4 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <Link href="/privacy" className="text-[13px] font-medium uppercase tracking-wide text-white transition hover:text-white/80">
            Privacy
          </Link>
          <Link href="/terms" className="text-[13px] font-medium uppercase tracking-wide text-white transition hover:text-white/80">
            Terms
          </Link>
          <Link href="/refunds" className="text-[13px] font-medium uppercase tracking-wide text-white transition hover:text-white/80">
            Refunds &amp; Delivery
          </Link>
          <Link href="/contact" className="text-[13px] font-medium uppercase tracking-wide text-white transition hover:text-white/80">
            Contact
          </Link>
        </nav>
        <p className="text-[13px] text-white">&copy;{new Date().getFullYear()} Gifterbell, Inc.</p>
      </div>
    </footer>
  );
}
