import Link from "next/link";

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.98a8.2 8.2 0 0 0 4.76 1.52V7.05a4.84 4.84 0 0 1-1-.36z" />
    </svg>
  );
}

export function Footer() {
  return (
    <>
      {/* Pre-footer section */}
      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
          {/* Columns */}
          <div className="flex gap-20">
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#1a2748]">The Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-slate-500 transition hover:text-[#2aa89c]">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#1a2748]">Questions?</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-sm text-slate-500 transition hover:text-[#2aa89c]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/gifterbell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a2748] transition hover:text-[#2aa89c]"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.tiktok.com/@gifterbell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a2748] transition hover:text-[#2aa89c]"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="bg-[#1a2748] py-4 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <Link href="/terms" className="text-[13px] font-medium uppercase tracking-wide text-white transition hover:text-white/80">
              Terms
            </Link>
            <Link href="/privacy" className="text-[13px] font-medium uppercase tracking-wide text-white transition hover:text-white/80">
              Privacy
            </Link>
            <Link href="/refunds" className="text-[13px] font-medium uppercase tracking-wide text-white transition hover:text-white/80">
              Refunds &amp; Delivery
            </Link>
          </nav>
          <p className="text-[13px] text-white">&copy;{new Date().getFullYear()} Gifterbell, Inc.</p>
        </div>
      </footer>
    </>
  );
}
