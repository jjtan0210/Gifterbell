import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata = {
  title: "Terms of Service | Gifterbell",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-[#2aa89c]">
          &larr; Back to Home
        </Link>
        <h1 className="mb-4 text-3xl font-bold text-[#1a2748]">Terms of Service</h1>
        <p className="mb-10 text-sm text-slate-400"><strong>Last updated:</strong> March 23, 2026</p>

        <div className="prose prose-slate max-w-none text-slate-600 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1a2748] [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
          <p>
            Welcome to Gifterbell. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website and
            services. By using our website or placing an order, you agree to these Terms.
          </p>

          <h2>1. Our Service</h2>
          <p>
            Gifterbell is a gift planning and coordination service. Customers can schedule one-time or
            recurring gifts for future delivery dates. Based on the information you provide about the
            recipient, occasion, preferences, and budget, we select, arrange, and coordinate the purchase
            and delivery of a gift on your behalf.
          </p>

          <h2>2. Gift Selection</h2>
          <p>
            By using our service, you authorize us to choose the final gift on your behalf based on the
            information you provide, including the recipient&rsquo;s age, interests, style preferences, occasion, and
            budget.
          </p>
          <p>You understand and agree that:</p>
          <ul>
            <li>We have discretion over the final gift selected.</li>
            <li>Sample gifts, images, and illustrations shown on the website are for inspiration only and do not represent the exact gift that will be sent.</li>
            <li>You will not preview or approve the exact gift before it is ordered.</li>
            <li>The final gift will be selected within your chosen budget range, including any applicable retailer-charged taxes.</li>
          </ul>

          <h2>3. Your Responsibilities</h2>
          <p>You are responsible for providing accurate and complete information, including:</p>
          <ul>
            <li>Your contact information</li>
            <li>The recipient&rsquo;s name and shipping address</li>
            <li>The requested delivery date</li>
            <li>The selected budget</li>
            <li>Any gift preferences or information to avoid</li>
          </ul>
          <p>
            We are not responsible for issues caused by inaccurate, incomplete, or outdated information
            you provide.
          </p>

          <h2>4. Pricing and Billing</h2>
          <p>You agree to pay:</p>
          <ul>
            <li>The final gift purchase amount, including any applicable taxes charged by the third-party retailer</li>
            <li>Our service fee</li>
            <li>Any optional add-ons selected at checkout</li>
          </ul>
          <p>
            Your selected budget range applies to the gift purchase, including any applicable
            retailer-charged taxes. We will select a gift so that the combined gift price and applicable taxes
            charged by the retailer remain within your selected budget range.
          </p>
          <p>
            Depending on the timing of your requested delivery date, we may either authorize your payment
            method for an estimated maximum amount or securely store your payment method for a later
            charge when the gift is processed.
          </p>
          <p>Your final charge will reflect:</p>
          <ul>
            <li>The actual gift purchase amount, including any applicable retailer-charged taxes</li>
            <li>Our service fee</li>
            <li>Any selected add-ons</li>
          </ul>
          <p>
            After the gift is ordered, we may provide an invoice or order summary showing a breakdown of
            the gift amount, retailer-charged taxes, our service fee, and any add-ons.
          </p>
          <p>
            We may update pricing and fees from time to time by posting revised pricing on the website.
          </p>

          <h2>5. Delivery Timing</h2>
          <p>
            We will make commercially reasonable efforts to arrange delivery by your requested date, but
            delivery dates are not guaranteed.
          </p>
          <p>
            Delivery timing may be affected by factors outside our control, including product availability,
            processing times, carrier delays, weather, and seasonal demand. Orders must be placed at
            least <strong>5 business days</strong> before the requested delivery date.
          </p>

          <h2>6. Recurring Plans</h2>
          <p>
            If you enroll in a recurring gift plan, you authorize us to process future gift orders according to
            the schedule you selected unless you cancel or modify the plan before the applicable
            processing cutoff.
          </p>
          <p>
            Before each scheduled recurring gift order, we will send a reminder email approximately{" "}
            <strong>10 business days</strong> before the scheduled delivery date. You will then have{" "}
            <strong>5 business days</strong> to make changes, skip that gift, update the address, change the budget, update recipient
            preferences, or cancel the upcoming order.
          </p>
          <p>
            If you do not respond within that period, the upcoming gift order may proceed automatically.
          </p>
          <p>
            You may cancel a recurring gift plan at any time before the next applicable processing cutoff.
            Canceling a recurring plan will stop future recurring orders, but will not cancel an order that has
            already entered processing or been placed.
          </p>

          <h2>7. Acceptable Use</h2>
          <p>
            You agree not to use our service for any unlawful, fraudulent, abusive, or unauthorized purpose,
            including providing false information or using payment methods without authorization.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, branding, logos, designs, and
            service-related materials, is owned by Gifterbell or its licensors and may not be copied,
            reproduced, distributed, or used without permission.
          </p>

          <h2>9. Disclaimer</h2>
          <p>
            Our services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent permitted
            by law, we disclaim all warranties, express or implied.
          </p>
          <p>We do not guarantee:</p>
          <ul>
            <li>That a recipient will like a selected gift</li>
            <li>Uninterrupted website availability</li>
            <li>Exact delivery timing</li>
            <li>The availability of any particular product</li>
          </ul>

          <h2>10. Liability</h2>
          <p>
            To the fullest extent permitted by law, Gifterbell will not be liable for any indirect, incidental,
            consequential, special, or punitive damages arising from or related to your use of the service.
          </p>
          <p>
            Our total liability for any claim relating to a specific order will not exceed the total amount you
            paid to us for that order.
          </p>

          <h2>11. Updates</h2>
          <p>
            We may update these Terms from time to time. Updated Terms will be posted on this page with
            a revised effective date.
          </p>

          <h2>12. Contact</h2>
          <p>
            If you have questions about these Terms, contact us at{" "}
            <a href="mailto:support@gifterbell.com" className="text-[#2aa89c] hover:underline">support@gifterbell.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
