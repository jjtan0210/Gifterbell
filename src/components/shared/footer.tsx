export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-slate-600 sm:flex-row sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Gifterbell. Premium gifting concierge.</p>
        <p>Secure checkout powered by Stripe. Account security powered by Supabase Auth.</p>
      </div>
    </footer>
  );
}
