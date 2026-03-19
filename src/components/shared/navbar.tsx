import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="w-1/3 text-left">
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-slate-700 transition hover:text-[#0a2a5e]"
          >
            How it works
          </Link>
        </div>

        <div className="w-1/3 text-center">
          <Link href="/" className="inline-flex items-center justify-center">
            <Image
              src="/brand/Logofinal.png"
              alt="Gifterbell"
              width={140}
              height={62}
              priority
              className="h-auto w-[110px] sm:w-[140px]"
            />
          </Link>
        </div>

        <div className="flex w-1/3 items-center justify-end gap-5 text-sm font-medium text-slate-700">
          <Link href="/#faq" className="transition hover:text-[#0a2a5e]">
            FAQs
          </Link>
          <Link href="/sign-in" className="transition hover:text-[#0a2a5e]">
            Sign in
          </Link>
          <Link href="/checkout" aria-label="Cart" className="inline-flex items-center gap-1.5 transition hover:text-[#0a2a5e]">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
