import type { ReactElement } from "react";

// Detailed line-art SVG illustrations — muted teal outline style
const S = "#3d6b6e";
const F = "#d6e5e3";
const S2 = "#5a8f8b";

export function OccasionIllustration({ occasion, className }: { occasion: string; className?: string }) {
  const illustrations: Record<string, ReactElement> = {
    "Birthday": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Cake base */}
        <rect x="16" y="58" width="68" height="28" rx="4" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Cake top layer */}
        <rect x="22" y="42" width="56" height="18" rx="4" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Frosting drip */}
        <path d="M22 48c4 4 8-2 12 2s8-2 12 2 8-2 12 2 8-2 12 2 8-2 12 2" stroke={S} strokeWidth="1.5" fill="none" />
        {/* Cake plate */}
        <ellipse cx="50" cy="86" rx="38" ry="4" fill="white" stroke={S} strokeWidth="1.8" />
        {/* Center candle */}
        <rect x="47" y="22" width="6" height="20" rx="2" fill="white" stroke={S} strokeWidth="1.8" />
        <line x1="50" y1="26" x2="50" y2="40" stroke={S2} strokeWidth="0.8" strokeDasharray="2 2" />
        {/* Left candle */}
        <rect x="31" y="26" width="5" height="16" rx="1.5" fill="white" stroke={S} strokeWidth="1.5" />
        <line x1="33.5" y1="30" x2="33.5" y2="40" stroke={S2} strokeWidth="0.6" strokeDasharray="2 2" />
        {/* Right candle */}
        <rect x="64" y="26" width="5" height="16" rx="1.5" fill="white" stroke={S} strokeWidth="1.5" />
        <line x1="66.5" y1="30" x2="66.5" y2="40" stroke={S2} strokeWidth="0.6" strokeDasharray="2 2" />
        {/* Center flame */}
        <path d="M50 14c-2 3-3.5 5-3.5 7a3.5 3.5 0 007 0c0-2-1.5-4-3.5-7z" fill={F} stroke={S} strokeWidth="1.5" />
        <path d="M50 17c-1 1.5-1.5 2.5-1.5 3.5a1.5 1.5 0 003 0c0-1-0.5-2-1.5-3.5z" fill="white" />
        {/* Left flame */}
        <path d="M33.5 20c-1.5 2-2.5 3.5-2.5 5a2.5 2.5 0 005 0c0-1.5-1-3-2.5-5z" fill={F} stroke={S} strokeWidth="1.2" />
        {/* Right flame */}
        <path d="M66.5 20c-1.5 2-2.5 3.5-2.5 5a2.5 2.5 0 005 0c0-1.5-1-3-2.5-5z" fill={F} stroke={S} strokeWidth="1.2" />
        {/* Decoration dots on cake */}
        <circle cx="30" cy="68" r="1.5" fill={S} opacity="0.25" />
        <circle cx="40" cy="72" r="1.5" fill={S} opacity="0.25" />
        <circle cx="50" cy="68" r="1.5" fill={S} opacity="0.25" />
        <circle cx="60" cy="72" r="1.5" fill={S} opacity="0.25" />
        <circle cx="70" cy="68" r="1.5" fill={S} opacity="0.25" />
      </svg>
    ),
    "Anniversary": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Left glass bowl */}
        <path d="M20 22c0 14 8 22 16 26" stroke={S} strokeWidth="2.2" fill="none" />
        <path d="M44 22c0 14-8 22-16 26" stroke={S} strokeWidth="2.2" fill="none" />
        {/* Left glass rim */}
        <ellipse cx="32" cy="22" rx="12" ry="4" fill={F} stroke={S} strokeWidth="1.8" />
        {/* Left stem */}
        <line x1="36" y1="48" x2="36" y2="68" stroke={S} strokeWidth="2" />
        {/* Left base */}
        <ellipse cx="36" cy="70" rx="10" ry="3.5" fill={F} stroke={S} strokeWidth="1.8" />
        {/* Right glass bowl */}
        <path d="M56 22c0 14 8 22 16 26" stroke={S} strokeWidth="2.2" fill="none" />
        <path d="M80 22c0 14-8 22-16 26" stroke={S} strokeWidth="2.2" fill="none" />
        {/* Right glass rim */}
        <ellipse cx="68" cy="22" rx="12" ry="4" fill={F} stroke={S} strokeWidth="1.8" />
        {/* Right stem */}
        <line x1="64" y1="48" x2="64" y2="68" stroke={S} strokeWidth="2" />
        {/* Right base */}
        <ellipse cx="64" cy="70" rx="10" ry="3.5" fill={F} stroke={S} strokeWidth="1.8" />
        {/* Liquid in left glass */}
        <path d="M24 30c0 8 4 14 8 18h8c4-4 8-10 8-18" stroke={S2} strokeWidth="0.8" fill={F} opacity="0.4" />
        {/* Liquid in right glass */}
        <path d="M60 30c0 8 4 14 8 18h8c4-4 8-10 8-18" stroke={S2} strokeWidth="0.8" fill={F} opacity="0.4" />
        {/* Bubbles left */}
        <circle cx="28" cy="32" r="1.5" stroke={S} strokeWidth="0.8" fill="none" />
        <circle cx="34" cy="28" r="1" stroke={S} strokeWidth="0.6" fill="none" />
        <circle cx="30" cy="36" r="0.8" stroke={S} strokeWidth="0.5" fill="none" />
        {/* Bubbles right */}
        <circle cx="66" cy="32" r="1.5" stroke={S} strokeWidth="0.8" fill="none" />
        <circle cx="72" cy="28" r="1" stroke={S} strokeWidth="0.6" fill="none" />
        <circle cx="68" cy="36" r="0.8" stroke={S} strokeWidth="0.5" fill="none" />
        {/* Clink sparkles */}
        <line x1="48" y1="16" x2="52" y2="16" stroke={S} strokeWidth="1.5" />
        <line x1="50" y1="14" x2="50" y2="18" stroke={S} strokeWidth="1.5" />
        <line x1="46" y1="10" x2="48" y2="10" stroke={S} strokeWidth="1" />
        <line x1="47" y1="9" x2="47" y2="11" stroke={S} strokeWidth="1" />
      </svg>
    ),
    "Holiday": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Tree trunk */}
        <rect x="45" y="80" width="10" height="12" rx="1.5" fill={F} stroke={S} strokeWidth="2" />
        {/* Bottom tier */}
        <path d="M18 82l32-24 32 24z" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Middle tier */}
        <path d="M24 66l26-22 26 22z" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Top tier */}
        <path d="M30 50l20-20 20 20z" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Star on top */}
        <path d="M50 22l2.5 5 5.5 0.8-4 3.9 0.9 5.5-4.9-2.6-4.9 2.6 0.9-5.5-4-3.9 5.5-0.8z" fill="white" stroke={S} strokeWidth="1.5" />
        {/* Ornaments */}
        <circle cx="42" cy="56" r="2.5" fill="white" stroke={S} strokeWidth="1.2" />
        <circle cx="56" cy="62" r="2.5" fill="white" stroke={S} strokeWidth="1.2" />
        <circle cx="38" cy="72" r="2.5" fill="white" stroke={S} strokeWidth="1.2" />
        <circle cx="60" cy="76" r="2.5" fill="white" stroke={S} strokeWidth="1.2" />
        <circle cx="50" cy="46" r="2" fill="white" stroke={S} strokeWidth="1" />
        {/* Garland lines */}
        <path d="M34 54c5 3 10 3 16 1s10-1 16 2" stroke={S2} strokeWidth="0.8" fill="none" />
        <path d="M28 70c6 3 12 3 22 0s14 0 20 3" stroke={S2} strokeWidth="0.8" fill="none" />
      </svg>
    ),
    "Mother's Day": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Vase */}
        <path d="M36 62c-3 10-2 22 14 22s17-12 14-22z" fill={F} stroke={S} strokeWidth="2.2" />
        <ellipse cx="50" cy="62" rx="14" ry="4" fill="white" stroke={S} strokeWidth="1.8" />
        {/* Vase decoration line */}
        <path d="M38 72c4 1 8 1.5 12 1.5s8-0.5 12-1.5" stroke={S2} strokeWidth="0.8" />
        {/* Stems */}
        <line x1="38" y1="62" x2="30" y2="34" stroke={S} strokeWidth="1.5" />
        <line x1="50" y1="62" x2="50" y2="28" stroke={S} strokeWidth="1.5" />
        <line x1="62" y1="62" x2="70" y2="34" stroke={S} strokeWidth="1.5" />
        <line x1="44" y1="62" x2="38" y2="30" stroke={S} strokeWidth="1.2" />
        <line x1="56" y1="62" x2="62" y2="30" stroke={S} strokeWidth="1.2" />
        {/* Left flower */}
        <circle cx="30" cy="28" r="7" fill={F} stroke={S} strokeWidth="1.5" />
        <circle cx="25" cy="22" r="4.5" fill={F} stroke={S} strokeWidth="1.2" />
        <circle cx="35" cy="22" r="4.5" fill={F} stroke={S} strokeWidth="1.2" />
        <circle cx="28" cy="18" r="3.5" fill={F} stroke={S} strokeWidth="1" />
        <circle cx="30" cy="28" r="3" fill="white" stroke={S} strokeWidth="1" />
        {/* Center flower (larger) */}
        <circle cx="50" cy="22" r="8" fill={F} stroke={S} strokeWidth="1.8" />
        <circle cx="44" cy="14" r="5" fill={F} stroke={S} strokeWidth="1.2" />
        <circle cx="56" cy="14" r="5" fill={F} stroke={S} strokeWidth="1.2" />
        <circle cx="48" cy="10" r="4" fill={F} stroke={S} strokeWidth="1" />
        <circle cx="52" cy="10" r="4" fill={F} stroke={S} strokeWidth="1" />
        <circle cx="50" cy="22" r="3.5" fill="white" stroke={S} strokeWidth="1" />
        {/* Right flower */}
        <circle cx="70" cy="28" r="7" fill={F} stroke={S} strokeWidth="1.5" />
        <circle cx="65" cy="22" r="4.5" fill={F} stroke={S} strokeWidth="1.2" />
        <circle cx="75" cy="22" r="4.5" fill={F} stroke={S} strokeWidth="1.2" />
        <circle cx="72" cy="18" r="3.5" fill={F} stroke={S} strokeWidth="1" />
        <circle cx="70" cy="28" r="3" fill="white" stroke={S} strokeWidth="1" />
        {/* Small filler flowers */}
        <circle cx="38" cy="26" r="3.5" fill={F} stroke={S} strokeWidth="1" />
        <circle cx="62" cy="26" r="3.5" fill={F} stroke={S} strokeWidth="1" />
        {/* Leaves */}
        <ellipse cx="28" cy="48" rx="6" ry="2.5" transform="rotate(-30 28 48)" fill={F} stroke={S} strokeWidth="1.2" />
        <ellipse cx="72" cy="48" rx="6" ry="2.5" transform="rotate(30 72 48)" fill={F} stroke={S} strokeWidth="1.2" />
      </svg>
    ),
    "Father's Day": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Mug body */}
        <rect x="8" y="30" width="42" height="42" rx="4" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Mug rim highlight */}
        <line x1="8" y1="36" x2="50" y2="36" stroke={S} strokeWidth="1.2" />
        {/* Mug handle */}
        <path d="M50 38c8-1 14 4 14 12s-6 13-14 12" stroke={S} strokeWidth="2.2" fill="none" />
        <path d="M50 42c5-0.5 9 3 9 8s-4 8.5-9 8" stroke={S2} strokeWidth="0.8" fill="none" />
        {/* Steam */}
        <path d="M20 26c0-4 3-6 1-10" stroke={S2} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M30 26c0-4 3-6 1-10" stroke={S2} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M40 26c0-4 3-6 1-10" stroke={S2} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Gift box next to mug */}
        <rect x="62" y="48" width="28" height="24" rx="2.5" fill={F} stroke={S} strokeWidth="2" />
        {/* Gift lid */}
        <rect x="59" y="40" width="34" height="10" rx="2.5" fill="white" stroke={S} strokeWidth="2" />
        {/* Gift ribbon vertical */}
        <line x1="76" y1="40" x2="76" y2="72" stroke={S} strokeWidth="1.8" />
        {/* Gift ribbon horizontal */}
        <line x1="59" y1="45" x2="93" y2="45" stroke={S} strokeWidth="0.8" />
        {/* Gift bow */}
        <path d="M76 40c-3-5-10-5-10-2s7 4 10 4 10-1 10-4-7-3-10 2z" fill="white" stroke={S} strokeWidth="1.5" />
        <ellipse cx="76" cy="39" rx="2.5" ry="3" fill={S} opacity="0.15" stroke={S} strokeWidth="1" />
      </svg>
    ),
    "Valentine's Day": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Heart-shaped box */}
        <path d="M50 85C50 85 14 60 14 38c0-12 8-22 18-22s14 6 18 14c4-8 8-14 18-14s18 10 18 22c0 22-36 47-36 47z" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Heart box lid line */}
        <path d="M14 42c8-2 16 0 22 4 4 2 8 3 14 3s10-1 14-3c6-4 14-6 22-4" stroke={S} strokeWidth="1.8" fill="none" />
        {/* Bow - left loop */}
        <path d="M50 42c-4-8-16-10-16-4s12 8 16 8" stroke={S} strokeWidth="2" fill="white" />
        {/* Bow - right loop */}
        <path d="M50 42c4-8 16-10 16-4s-12 8-16 8" stroke={S} strokeWidth="2" fill="white" />
        {/* Bow center knot */}
        <ellipse cx="50" cy="40" rx="3.5" ry="4" fill={S} opacity="0.15" stroke={S} strokeWidth="1.5" />
        {/* Bow tails */}
        <path d="M46 42c-2-2-4-1-5 1" stroke={S} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M54 42c2-2 4-1 5 1" stroke={S} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Chocolates inside (circles in grid) */}
        <circle cx="38" cy="58" r="4" fill="white" stroke={S} strokeWidth="1.2" />
        <circle cx="50" cy="56" r="4" fill="white" stroke={S} strokeWidth="1.2" />
        <circle cx="62" cy="58" r="4" fill="white" stroke={S} strokeWidth="1.2" />
        <circle cx="44" cy="68" r="4" fill="white" stroke={S} strokeWidth="1.2" />
        <circle cx="56" cy="68" r="4" fill="white" stroke={S} strokeWidth="1.2" />
        <circle cx="50" cy="78" r="3.5" fill="white" stroke={S} strokeWidth="1.2" />
        {/* Swirl on chocolates */}
        <path d="M38 56c0 1-1 2-1 3" stroke={S2} strokeWidth="0.6" fill="none" />
        <path d="M50 54c0 1-1 2-1 3" stroke={S2} strokeWidth="0.6" fill="none" />
        <path d="M62 56c0 1 1 2 1 3" stroke={S2} strokeWidth="0.6" fill="none" />
      </svg>
    ),
    "Baby Shower / Newborn": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Body */}
        <ellipse cx="48" cy="62" rx="26" ry="20" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Tail feather */}
        <path d="M22 52c-4-6-3-14 2-18c-1 6 2 12 6 16" fill={F} stroke={S} strokeWidth="1.8" strokeLinejoin="round" />
        {/* Head */}
        <circle cx="62" cy="34" r="14" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Eye */}
        <circle cx="66" cy="31" r="2.2" fill={S} />
        <circle cx="67" cy="30" r="0.8" fill="white" />
        {/* Beak */}
        <path d="M74 36c6 1 8 3 7 5s-4 2-7 1z" fill="#e8a838" stroke={S} strokeWidth="1.4" />
        {/* Wing */}
        <path d="M36 54c4-6 14-8 20-4c-4 1-10 4-14 8z" fill="white" stroke={S2} strokeWidth="1" opacity="0.7" />
        {/* Water line */}
        <path d="M16 76c6-3 12 1 18-2s12 1 18-2s12 1 18-2" stroke={S2} strokeWidth="1.2" strokeLinecap="round" />
        {/* Sparkle */}
        <circle cx="82" cy="24" r="1.5" fill={S} opacity="0.3" />
        <circle cx="20" cy="32" r="1.2" fill={S} opacity="0.25" />
      </svg>
    ),
    "Wedding": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Left ring */}
        <circle cx="38" cy="54" r="18" fill="none" stroke={S} strokeWidth="2.5" />
        <circle cx="38" cy="54" r="12" fill="none" stroke={S2} strokeWidth="0.8" />
        {/* Right ring (overlapping) */}
        <circle cx="62" cy="54" r="18" fill="none" stroke={S} strokeWidth="2.5" />
        <circle cx="62" cy="54" r="12" fill="none" stroke={S2} strokeWidth="0.8" />
        {/* Large diamond on left ring */}
        <path d="M38 36l-7-9h14l-7 9z" fill="white" stroke={S} strokeWidth="1.8" />
        <path d="M31 27h14" stroke={S} strokeWidth="1" />
        <line x1="34" y1="27" x2="38" y2="36" stroke={S} strokeWidth="0.8" />
        <line x1="42" y1="27" x2="38" y2="36" stroke={S} strokeWidth="0.8" />
        <line x1="38" y1="27" x2="38" y2="36" stroke={S2} strokeWidth="0.5" />
        {/* Large diamond on right ring */}
        <path d="M62 36l-7-9h14l-7 9z" fill="white" stroke={S} strokeWidth="1.8" />
        <path d="M55 27h14" stroke={S} strokeWidth="1" />
        <line x1="58" y1="27" x2="62" y2="36" stroke={S} strokeWidth="0.8" />
        <line x1="66" y1="27" x2="62" y2="36" stroke={S} strokeWidth="0.8" />
        <line x1="62" y1="27" x2="62" y2="36" stroke={S2} strokeWidth="0.5" />
        {/* Sparkles around diamonds */}
        <line x1="50" y1="12" x2="50" y2="19" stroke={S} strokeWidth="1.5" />
        <line x1="46.5" y1="15.5" x2="53.5" y2="15.5" stroke={S} strokeWidth="1.5" />
        <circle cx="28" cy="20" r="1.5" fill={S} opacity="0.3" />
        <circle cx="72" cy="20" r="1.2" fill={S} opacity="0.25" />
        <line x1="24" y1="28" x2="26" y2="26" stroke={S} strokeWidth="1" />
        <line x1="76" y1="28" x2="74" y2="26" stroke={S} strokeWidth="1" />
        {/* Ring shine highlights */}
        <path d="M26 46c-1 2-1 4 0 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M74 46c1 2 1 4 0 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    "Graduation": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Cap board (mortarboard) */}
        <polygon points="50,18 8,40 50,62 92,40" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Cap skull */}
        <path d="M30 46v16c0 6 9 10 20 10s20-4 20-10V46" stroke={S} strokeWidth="2" fill={F} />
        <path d="M30 46c9 6 20 8 40 0" stroke={S} strokeWidth="1.5" fill="none" />
        {/* Tassel string */}
        <line x1="92" y1="40" x2="88" y2="58" stroke={S} strokeWidth="2" />
        {/* Tassel knot */}
        <circle cx="88" cy="60" r="3" fill={S} opacity="0.3" stroke={S} strokeWidth="1.2" />
        {/* Tassel fringe */}
        <line x1="86" y1="63" x2="85" y2="72" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="88" y1="63" x2="88" y2="73" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="90" y1="63" x2="91" y2="72" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
        {/* Button on top */}
        <circle cx="50" cy="40" r="2.5" fill={S} opacity="0.2" stroke={S} strokeWidth="1" />
        {/* Board edge highlight */}
        <line x1="50" y1="18" x2="50" y2="22" stroke={S2} strokeWidth="0.8" />
      </svg>
    ),
    "Housewarming": (
      <svg viewBox="5 -2 90 90" fill="none" className={className}>
        {/* Key bow (round part) */}
        <circle cx="22" cy="52" r="12" fill={F} stroke={S} strokeWidth="2.5" />
        <circle cx="22" cy="52" r="6" fill="white" stroke={S} strokeWidth="1.8" />
        {/* Key shaft */}
        <line x1="34" y1="52" x2="58" y2="52" stroke={S} strokeWidth="2.5" strokeLinecap="round" />
        {/* Key teeth */}
        <path d="M50 52v8" stroke={S} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M54 52v6" stroke={S} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M58 52v7" stroke={S} strokeWidth="2.2" strokeLinecap="round" />
        {/* House body */}
        <rect x="58" y="32" width="30" height="26" rx="2" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Roof */}
        <path d="M54 32l19-18 19 18" fill="white" stroke={S} strokeWidth="2.2" strokeLinejoin="round" />
        {/* Door */}
        <rect x="68" y="42" width="10" height="16" rx="1.5" fill="white" stroke={S} strokeWidth="1.5" />
        <circle cx="76" cy="51" r="1.2" fill={S} />
        {/* Window */}
        <rect x="80" y="37" width="6" height="6" rx="1" fill="white" stroke={S} strokeWidth="1.2" />
        <line x1="83" y1="37" x2="83" y2="43" stroke={S} strokeWidth="0.8" />
        <line x1="80" y1="40" x2="86" y2="40" stroke={S} strokeWidth="0.8" />
        {/* Chimney */}
        <rect x="80" y="10" width="6" height="12" fill={F} stroke={S} strokeWidth="1.5" />
        {/* Smoke */}
        <path d="M83 8c0-3 2-4 1-6" stroke={S2} strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Small plant by door */}
        <ellipse cx="66" cy="56" rx="3" ry="2" fill={F} stroke={S} strokeWidth="0.8" />
        <line x1="66" y1="54" x2="66" y2="50" stroke={S} strokeWidth="0.8" />
        <circle cx="66" cy="49" r="2" fill={F} stroke={S} strokeWidth="0.8" />
      </svg>
    ),
    "Just Because": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Back box (small, right) */}
        <rect x="52" y="32" width="28" height="22" rx="2.5" fill={F} stroke={S} strokeWidth="1.8" />
        <rect x="49" y="26" width="34" height="8" rx="2.5" fill="white" stroke={S} strokeWidth="1.8" />
        <line x1="66" y1="26" x2="66" y2="54" stroke={S} strokeWidth="1.5" />
        <path d="M66 26c-2-4-8-4-8-1.5s6 3.5 8 3.5 8-1 8-3.5-6-2.5-8 1.5z" fill="white" stroke={S} strokeWidth="1.2" />
        <ellipse cx="66" cy="25" rx="2" ry="2.5" fill={S} opacity="0.15" stroke={S} strokeWidth="0.8" />
        {/* Front box (large, left) */}
        <rect x="10" y="40" width="46" height="34" rx="3" fill={F} stroke={S} strokeWidth="2.2" />
        <rect x="6" y="30" width="54" height="12" rx="3" fill="white" stroke={S} strokeWidth="2.2" />
        {/* Front ribbon */}
        <line x1="33" y1="30" x2="33" y2="74" stroke={S} strokeWidth="2" />
        <line x1="6" y1="36" x2="60" y2="36" stroke={S} strokeWidth="1" />
        {/* Front bow */}
        <path d="M33 30c-4-7-14-7-14-3s10 6 14 6 14-2 14-6-10-4-14 3z" fill="white" stroke={S} strokeWidth="1.8" />
        <ellipse cx="33" cy="28" rx="3.5" ry="4" fill={S} opacity="0.15" stroke={S} strokeWidth="1.2" />
        {/* Ribbon tails */}
        <path d="M29 30c-2-1.5-4-1-5 0.5" stroke={S} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M37 30c2-1.5 4-1 5 0.5" stroke={S} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Shadow */}
        <ellipse cx="42" cy="78" rx="30" ry="3" fill={F} opacity="0.4" />
        {/* Tag detail */}
        <path d="M82 38l-6 4 2 6" stroke={S} strokeWidth="1" fill="none" />
        <circle cx="82" cy="38" r="1.5" fill="none" stroke={S} strokeWidth="0.8" />
      </svg>
    ),
    "Other": (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        {/* Gift tag body - angled */}
        <path d="M28 20l-14 14v30l34 18 30-30L62 20z" fill={F} stroke={S} strokeWidth="2.2" />
        {/* Tag fold line */}
        <path d="M28 20l-14 14h14z" fill="white" stroke={S} strokeWidth="1.5" />
        {/* Tag hole */}
        <circle cx="24" cy="40" r="4.5" fill="white" stroke={S} strokeWidth="2" />
        {/* String from hole */}
        <path d="M20 36l-8-10" stroke={S} strokeWidth="2" strokeLinecap="round" />
        <path d="M12 26c-2-1-4 0-3 2" stroke={S} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Lines suggesting text */}
        <line x1="30" y1="50" x2="52" y2="38" stroke={S2} strokeWidth="1.2" />
        <line x1="32" y1="56" x2="54" y2="44" stroke={S2} strokeWidth="1.2" />
        <line x1="34" y1="62" x2="48" y2="54" stroke={S2} strokeWidth="0.8" />
        {/* Sparkle top right */}
        <line x1="72" y1="14" x2="72" y2="24" stroke={S} strokeWidth="2" />
        <line x1="67" y1="19" x2="77" y2="19" stroke={S} strokeWidth="2" />
        {/* Sparkle small */}
        <line x1="82" y1="28" x2="82" y2="34" stroke={S} strokeWidth="1.5" />
        <line x1="79" y1="31" x2="85" y2="31" stroke={S} strokeWidth="1.5" />
        {/* Dot sparkles */}
        <circle cx="66" cy="10" r="1.5" fill={S} opacity="0.3" />
        <circle cx="86" cy="22" r="1.2" fill={S} opacity="0.3" />
      </svg>
    ),
  };

  return illustrations[occasion] ?? illustrations["Other"];
}
