"use client";

import Image from "next/image";
import Link from "next/link";
import { Ban, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Mail, Repeat2, ShieldCheck, ShoppingCart, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

const painPoints = [
  "I forgot my friend's birthday again, and now it's too late to send something",
  "My nephew's birthday is this weekend, and I still have no idea what to get him",
  "I never know what kids are into at different ages",
  "I just realized Mother's Day is next week, and I still haven't ordered anything for my mom",
  "I know my anniversary is coming up, but I haven't had time to think about what to get",
  "I want to show I care, but I don't have time to shop for everyone",
  "There are too many kids now, I can't keep track of whose birthday is when",
  "I can barely keep up with my own schedule, let alone everyone's milestones",
  "Every holiday season feels like a gift-buying fire drill",
  "I don't have time to research gifts for every person in my life",
  "Gift-giving feels like a chore when I already have a full plate",
];

const testimonials = [
  {
    quote:
      "This service makes me look so thoughtful without the work. The gift was perfect, and I didn't miss deadlines.",
    author: "Ariana M.",
  },
  {
    quote: "I set up recurring plans for family birthdays and finally stopped forgetting dates.",
    author: "Jordan P.",
  },
  {
    quote: "I gave a budget, and they handled everything from there. Made my life so much easier.",
    author: "Taylor S.",
  },
  {
    quote: "I don't shop, I don't stress, and I don't forget anymore — the gifts just arrive right on time.",
    author: "Casey L.",
  },
  {
    quote: "I added all my nieces and nephews once, and now I'm not scrambling before every birthday party.",
    author: "Morgan R.",
  },
  {
    quote: "I used to miss at least one important date every year. Now I look way more on top of things than I am.",
    author: "Samira K.",
  },
  {
    quote: "I love that I don't have to figure out what to buy for each person every single time",
    author: "Drew T.",
  },
];

const giftInspirationImages = [
  "/brand/G1.png",
  "/brand/G2.png",
  "/brand/G3.png",
  "/brand/G4.png",
  "/brand/G5.png",
  "/brand/G6.png",
  "/brand/G7.png",
];

const heroRollingWords = ["birthday", "holiday", "mother's day", "anniversary"];

const faqs = [
  {
    q: "How does Gifterbell pick gifts?",
    a: "We use your recipient profile, occasion, budget, and style preferences to curate from trusted products. Every selection is made by our internal gifting team.",
  },
  {
    q: "Can I see the gift before it's sent?",
    a: "For concierge quality control, we finalize selections internally. You'll receive confirmation details right after your gift is sent.",
  },
  {
    q: "What if the recipient doesn't like the gift?",
    a: "We optimize gift fit based on profile data and occasion details. If there's an issue, support can help with replacement options where eligible.",
  },
  {
    q: "How do recurring gift plans work?",
    a: "You choose cadence and budget once. We automatically source and ship each gift on schedule, and you can edit or pause plans anytime.",
  },
  {
    q: "When will I be charged?",
    a: "For one-time gifts, you're charged at checkout. For recurring plans, your saved payment method is charged when each scheduled gift is processed.",
  },
  {
    q: "Can I cancel or modify a gift plan?",
    a: "Yes. You can edit recipients, budgets, and timing in your dashboard, or pause/cancel upcoming sends before they enter processing.",
  },
  {
    q: "Do you ship internationally?",
    a: "International support is rolling out by region. Enter your recipient address during setup and we'll confirm availability.",
  },
];

export function HomeContent() {
  const [painIdx, setPainIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [heroWordIdx, setHeroWordIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [galleryStart, setGalleryStart] = useState(0);
  const totalPainPoints = painPoints.length;
  const totalTestimonials = testimonials.length;
  const benefits = [
    {
      icon: <CalendarDays className="h-7 w-7" />,
      text: (
        <>
          <strong>No need to remember</strong> every occasion ever again
        </>
      ),
    },
    {
      icon: <ShoppingCart className="h-7 w-7" />,
      text: (
        <>
          <strong>Skip the gift shopping</strong> and <strong>figuring out</strong> what to buy
        </>
      ),
    },
    {
      icon: <ShieldCheck className="h-7 w-7" />,
      text: (
        <>
          Thoughtfully chosen gifts from <strong>trusted, reputable retailers</strong>
        </>
      ),
    },
    {
      icon: <Mail className="h-7 w-7" />,
      text: (
        <>
          A <strong>personal gift note</strong>, included every time
        </>
      ),
    },
    {
      icon: <Wallet className="h-7 w-7" />,
      text: (
        <>
          Stay <strong>within your budget</strong>, always
        </>
      ),
    },
    {
      icon: <Repeat2 className="h-7 w-7" />,
      text: (
        <>
          <strong>Set it and forget it</strong> with custom gift plans—no more dates to remember or gifts to manage
        </>
      ),
    },
    {
      icon: <Ban className="h-7 w-7" />,
      text: (
        <>
          <strong>No subscription</strong> required
        </>
      ),
    },
  ];

  useEffect(() => {
    const id = window.setInterval(() => {
      setPainIdx((prev) => {
        const next = prev + 1;
        return next >= totalPainPoints ? 0 : next;
      });
    }, 2500);
    return () => window.clearInterval(id);
  }, [totalPainPoints]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTestimonialIdx((prev) => {
        const next = prev + 1;
        return next >= totalTestimonials ? 0 : next;
      });
    }, 2500);
    return () => window.clearInterval(id);
  }, [totalTestimonials]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroWordIdx((prev) => (prev + 1) % heroRollingWords.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setGalleryStart((prev) => (prev + 1) % giftInspirationImages.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/brand/background4.png"
            alt="People exchanging gifts"
            fill
            priority
            className="object-contain object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/45 to-white/60" />
        </div>

        <div className="relative mx-auto flex min-h-[74vh] max-w-6xl flex-col items-center justify-center px-4 py-18 text-center sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-[#0a2a5e] sm:text-5xl lg:text-6xl">
            Stay on top of
            <br />
            <span className="hero-word-slot">
              {heroRollingWords.map((word, idx) => (
                <span
                  key={word}
                  className={`hero-word-item italic text-[#67b8ab] ${idx === heroWordIdx ? "hero-word-flip" : ""}`}
                  style={{ fontFamily: "\"Times New Roman\", Times, serif", visibility: idx === heroWordIdx ? "visible" : "hidden" }}
                >
                  {word}
                </span>
              ))}
            </span>{" "}
            gifts —<br />without the mental load
          </h1>
          <p className="mt-5 max-w-2xl text-xl text-slate-900">
            Thoughtful gifting on autopilot. You set the budget. We&apos;ll remember every occasion, pick the right gift, and get it delivered to everyone on your list.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/gift"
              className="rounded-full bg-[#1D9CAB] px-8 py-3.5 text-lg font-bold text-white transition hover:bg-[#178898]"
              style={{ color: "#ffffff" }}
            >
              Schedule A Gift
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#EDF7F6] py-22">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-0 max-w-2xl text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0a2a5e] sm:text-5xl lg:text-5xl">How it works</h2>
          </div>

          <div className="-mt-4 grid gap-8 md:grid-cols-3">
            {[
              {
                iconSrc: "/brand/icon1F.png",
                title: "Set it up once",
                text: "Tell us your budget, your people, and the dates that matter. Send a gift once or make it recurring\u2014it\u2019s up to you.",
              },
              {
                iconSrc: "/brand/icon2F.png",
                title: "We shop and send",
                text: "When the date comes, we automatically choose the gift and make sure it gets shipped out on time. You\u2019ll be notified once it\u2019s sent.",
              },
              {
                iconSrc: "/brand/icon3F.png",
                title: "You relax",
                text: "Gifts show up at the recipient\u2019s doorstep\nright on time\u2014no more rushing,\nno forgotten dates. Just let the\ncompliments roll in!",
              },
            ].map((item) => (
              <article key={item.title} className="text-center text-[#0f1b3a]">
                <div className="relative mx-auto mb-4 h-80 w-80">
                  <Image src={item.iconSrc} alt="" fill className="object-contain" />
                </div>
                <div className="-mt-10">
                  <h3 className="text-3xl font-extrabold leading-tight text-[#134B46]">{item.title}</h3>
                  <p className="mx-auto mt-4 max-w-md whitespace-pre-line text-lg leading-relaxed text-slate-700">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="pointer-events-none absolute inset-0">
          <Image src="/brand/background3.png" alt="" fill className="object-cover opacity-10" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-white" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xl font-extrabold uppercase tracking-[0.16em] text-[#2ea79a]">Sound familiar?</p>
            <div className="mt-6 h-[230px] overflow-hidden">
              <p className="text-3xl font-normal leading-tight text-[#111b39] md:text-4xl">
                &ldquo;{painPoints[painIdx]}&rdquo;
              </p>
            </div>
            <div className="-mt-2 flex justify-start">
              <Link
                href="/gift"
                className="relative z-10 inline-flex rounded-full bg-[#1B3263] px-8 py-3.5 text-lg font-bold text-white transition hover:bg-[#14274E]"
                style={{ color: "#ffffff" }}
              >
                Schedule A Gift
              </Link>
            </div>
          </div>

          <div>
            <h3
              className="text-3xl font-extrabold leading-tight md:text-4xl"
              style={{ color: "#14274E" }}
            >
              Less to Remember. Less to Do.
            </h3>
            <ul className="mt-8 space-y-4 text-base text-slate-500 md:text-lg">
              {benefits.map((benefit, idx) => (
                <li key={`benefit-${idx}`} className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#1D9CAB]">
                    {benefit.icon}
                  </span>
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f2f6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0f1b3a] sm:text-4xl">Thoughtful Gifts From Trusted Retailers.</h2>
            <p className="mt-4 text-lg text-slate-500">Have a look at a few examples:</p>
          </div>

          <div className="relative mt-10">
            <button
              type="button"
              aria-label="Previous images"
              onClick={() => setGalleryStart((prev) => (prev - 1 + giftInspirationImages.length) % giftInspirationImages.length)}
              className="absolute left-0 top-1/2 z-20 -translate-x-2 -translate-y-1/2 rounded-full border border-slate-300 bg-white p-3 text-slate-700 shadow-sm transition hover:border-[#0a2a5e] hover:text-[#0a2a5e] md:-translate-x-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              aria-label="Next images"
              onClick={() => setGalleryStart((prev) => (prev + 1) % giftInspirationImages.length)}
              className="absolute right-0 top-1/2 z-20 translate-x-2 -translate-y-1/2 rounded-full border border-slate-300 bg-white p-3 text-slate-700 shadow-sm transition hover:border-[#0a2a5e] hover:text-[#0a2a5e] md:translate-x-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="grid gap-6 md:grid-cols-3">
              {[0, 1, 2].map((offset) => {
                const index = (galleryStart + offset) % giftInspirationImages.length;
                const image = giftInspirationImages[index];
                return (
                  <article key={`${image}-${offset}`} className="overflow-hidden rounded-[2rem]">
                    <div className="relative h-[340px] w-full">
                      <Image src={image} alt={`Gift inspiration ${index + 1}`} fill className="object-contain" />
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {giftInspirationImages.map((_, idx) => (
                <span
                  key={`gallery-dot-${idx}`}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === galleryStart ? "w-8 bg-[#0a2a5e]" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">Made for busy people.</p>
          <div className="mt-5 h-[100px] overflow-hidden">
            <blockquote className="text-3xl font-bold leading-tight text-[#0a2a5e]">
              &ldquo;{testimonials[testimonialIdx].quote}&rdquo;
            </blockquote>
          </div>
          <div className="mt-2 h-8">
            <p className="text-lg text-slate-600">{testimonials[testimonialIdx].author}</p>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#f2f2f6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-6xl font-extrabold leading-tight text-[#111b39]">Frequently asked questions</h2>
            <p className="mt-4 text-2xl text-slate-500">Everything you need to know about Gifterbell</p>
          </div>

          <div className="mx-auto mt-14 max-w-5xl border-y border-slate-300/70">
            {faqs.map((faq, idx) => (
              <article key={faq.q} className="border-b border-slate-300/70 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq((prev) => (prev === idx ? null : idx))}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <h3 className={`text-xl font-semibold ${openFaq === idx || idx === 0 ? "text-[#2ea79a]" : "text-[#111b39]"}`}>{faq.q}</h3>
                  <ChevronDown
                    className={`h-7 w-7 shrink-0 transition-transform ${openFaq === idx ? "rotate-180 text-[#2ea79a]" : idx === 0 ? "text-[#2ea79a]" : "text-[#111b39]"}`}
                  />
                </button>
                {openFaq === idx && <p className="pb-7 pr-16 text-lg leading-relaxed text-slate-500">{faq.a}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
