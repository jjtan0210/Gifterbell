import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata = {
  title: "Refunds, Returns & Delivery | Gifterbell",
};

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-[#2aa89c]">
          &larr; Back to Home
        </Link>
        <h1 className="mb-4 text-3xl font-bold text-[#1a2748]">Refunds, Returns &amp; Delivery</h1>
        <p className="mb-10 text-sm text-slate-400"><strong>Last updated:</strong> March 23, 2026</p>

        <div className="prose prose-slate max-w-none text-slate-600 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1a2748] [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
          <p>
            Because each gift is selected and arranged specifically for your occasion, our cancellation,
            refund, return, and delivery policy differs from that of a traditional online store.
          </p>

          <h2>1. Cancellations</h2>
          <p>
            You may cancel an order for a full refund any time before we place the gift order with a
            third-party retailer.
          </p>
          <p>
            Once the gift order has been placed, our service has begun and our service fee becomes
            non-refundable.
          </p>
          <p>Orders cannot be canceled after the gift has shipped.</p>

          <h2>2. Refunds</h2>
          <p>If you cancel before the gift is purchased, you will receive a full refund.</p>
          <p>
            After the gift has been purchased, refunds are available only to the extent that we are able to
            recover funds from the applicable retailer or carrier, if any.
          </p>
          <p>We do not provide refunds simply because:</p>
          <ul>
            <li>A recipient chooses not to keep a delivered gift</li>
            <li>The recipient&rsquo;s preferences differ from the final gift selected</li>
            <li>A gift was selected by us in good faith based on the information you provided</li>
          </ul>
          <p>
            If an order cannot be fulfilled, is canceled by the retailer, or is lost and not replaced, we will
            refund any amount that we did not ultimately provide, including any recoverable gift purchase
            amount and retailer-charged taxes, less any non-refundable service fees, processed add-ons,
            or other unrecoverable costs already incurred.
          </p>

          <h2>3. Recipient Returns</h2>
          <p>We do not accept direct returns of delivered gifts.</p>
          <p>
            If a gift is eligible for return, the recipient may be able to return it directly through the applicable
            retailer using that retailer&rsquo;s gift return process. Any such return is governed by the retailer&rsquo;s own
            policies, eligibility rules, and time windows.
          </p>
          <p>
            Any refund, credit, or store credit issued in connection with a recipient return is handled by the
            retailer, not by Gifterbell.
          </p>

          <h2>4. Damaged, Defective, or Incorrect Items</h2>
          <p>
            If a gift arrives damaged, defective, or materially incorrect, please contact us promptly after
            delivery.
          </p>
          <p>
            We may request photographs or additional information and will make reasonable efforts to help
            direct you or the recipient to the appropriate resolution process.
          </p>

          <h2>5. Non-Refundable Fees</h2>
          <p>Our service fee is non-refundable once we begin processing or place the gift order.</p>
          <p>Optional add-ons may also be non-refundable once processed.</p>

          <h2>6. Requested Delivery Dates</h2>
          <p>
            You may select a requested delivery date during checkout. We will make commercially
            reasonable efforts to have the gift arrive by that date, but delivery dates are not guaranteed.
          </p>
          <p>
            Shipping timelines depend on product availability, processing times, carrier performance,
            weather, and other factors outside our control. Orders must be placed at least{" "}
            <strong>5 business days</strong> before the requested delivery date.
          </p>

          <h2>7. Delays</h2>
          <p>
            We are not responsible for shipping delays caused by third-party retailers, carriers, weather
            conditions, or other events beyond our reasonable control.
          </p>
          <p>
            If we determine that a requested delivery date is not reasonably achievable, we may contact
            you to discuss available options.
          </p>

          <h2>8. Address Accuracy</h2>
          <p>
            Customers are responsible for providing a complete and accurate recipient name and shipping
            address.
          </p>
          <p>
            We are not responsible for failed delivery, delay, or loss resulting from an incorrect, incomplete,
            outdated, or undeliverable address provided at checkout. If a package is returned as
            undeliverable and we recover any refundable amount, any refund will be limited to the amount
            recovered, minus our non-refundable service fee and any unrecoverable costs.
          </p>

          <h2>9. Recipient Unavailability</h2>
          <p>We are not responsible if the recipient is unavailable to accept delivery.</p>
          <p>
            If a package is returned as undeliverable and we recover any refundable amount, any refund
            will be limited to the amount recovered, minus our non-refundable service fee and any
            unrecoverable costs.
          </p>

          <h2>10. Delivered Packages</h2>
          <p>
            Once tracking shows that a package was delivered to the address provided at checkout, our
            delivery obligation is considered complete, subject to any applicable retailer or carrier claims
            process.
          </p>

          <h2>11. Contact</h2>
          <p>
            If you have questions about an order, cancellation, return, or delivery issue, contact us at{" "}
            <a href="mailto:support@gifterbell.com" className="text-[#2aa89c] hover:underline">support@gifterbell.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
