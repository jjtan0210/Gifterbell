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
        <h1 className="mb-4 text-3xl font-bold text-[#1a2748]">Privacy Policy</h1>
        <p className="mb-10 text-sm text-slate-400"><strong>Last updated:</strong> March 23, 2026</p>

        <div className="prose prose-slate max-w-none text-slate-600 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1a2748] [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#1a2748] [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
          <p>
            Gifterbell respects your privacy. This Privacy Policy explains what information we collect, how
            we use it, and the choices available to you.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Customer Information</h3>
          <p>We may collect information you provide directly to us, including:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Occasion details</li>
            <li>Gift budget</li>
            <li>Requested delivery date</li>
            <li>Gift message details</li>
            <li>Gift wrapping preferences</li>
            <li>Recurring gift plan selections</li>
          </ul>

          <h3>Recipient Information</h3>
          <p>We may collect:</p>
          <ul>
            <li>Name</li>
            <li>Shipping address</li>
            <li>Age or age range</li>
            <li>Interests</li>
            <li>Gift preferences or style indicators</li>
            <li>Information about what kinds of gifts to avoid</li>
          </ul>

          <h3>Payment Information</h3>
          <p>
            Payment information is processed through third-party payment providers. We do not store full
            payment card details ourselves.
          </p>

          <h2>2. How We Use Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and operate our services</li>
            <li>Select and arrange gifts</li>
            <li>Process orders and payments</li>
            <li>Coordinate shipping and delivery</li>
            <li>Communicate with customers</li>
            <li>Manage recurring gift plans</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Sharing Information</h2>
          <p>
            We may share information with third-party service providers as necessary to operate our
            business and fulfill orders, including providers that support:
          </p>
          <ul>
            <li>Payment processing</li>
            <li>Order fulfillment</li>
            <li>Shipping and delivery</li>
            <li>Email communications</li>
            <li>Website hosting</li>
            <li>Data storage and infrastructure</li>
            <li>Analytics, security, and support tools</li>
          </ul>
          <p>We do not sell personal information.</p>

          <h2>4. Data Retention</h2>
          <p>
            We retain personal information for as long as reasonably necessary to provide our services,
            maintain business records, comply with legal obligations, resolve disputes, and enforce our
            agreements.
          </p>

          <h2>5. Your Requests</h2>
          <p>
            You may contact us at{" "}
            <a href="mailto:support@gifterbell.com" className="text-[#2aa89c] hover:underline">support@gifterbell.com</a>{" "}
            to request access to, correction of, or deletion
            of your personal information, subject to applicable law and legitimate business retention needs.
          </p>

          <h2>6. Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational measures to protect personal
            information. However, no method of transmission or storage is completely secure, and we
            cannot guarantee absolute security.
          </p>

          <h2>7. Children&rsquo;s Information</h2>
          <p>
            Our service may involve collecting information about child recipients solely for the purpose of
            selecting and sending age-appropriate gifts on behalf of an adult customer. Our service is
            intended for adults, and we do not knowingly allow children to create accounts or place orders
            directly.
          </p>

          <h2>8. Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. Updated versions will be posted on this
            page with a revised effective date.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have questions or requests relating to privacy, contact us at{" "}
            <a href="mailto:support@gifterbell.com" className="text-[#2aa89c] hover:underline">support@gifterbell.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
