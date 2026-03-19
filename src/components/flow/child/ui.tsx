import { ArrowLeft } from "lucide-react";
import { forwardRef, ReactNode, useCallback, useEffect, useRef, useState } from "react";

// ─── Progress Header ──────────────────────────────────────────────────────────
export function ProgressHeader({
  current,
  total,
  onBack,
}: {
  current: number;
  total: number;
  onBack?: () => void;
}) {
  const progress = Math.max(0, Math.min(100, (current / total) * 100));

  return (
    <div className="mb-6 px-2 py-3 sm:px-6">
      <div className="mx-auto flex w-full max-w-lg items-center gap-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-500"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <div className="h-9 w-9 shrink-0" aria-hidden />
        )}
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#4F7C82] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="min-w-[50px] text-right text-sm font-medium text-slate-400">
          {current} / {total}
        </p>
      </div>
    </div>
  );
}

// ─── Step Layout ──────────────────────────────────────────────────────────────
export function StepLayout({
  title,
  subtitle,
  children,
  footer,
  className,
  titleClassName,
  subtitleClassName,
  contentClassName,
  plain,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  contentClassName?: string;
  plain?: boolean;
}) {
  return (
    <section
      className={`flow-fade mx-auto max-w-lg ${
        plain
          ? "bg-transparent px-1 py-0 shadow-none ring-0"
          : "rounded-[28px] bg-white px-5 py-8 shadow-sm ring-1 ring-slate-200 sm:px-8 sm:py-10"
      } ${className ?? ""}`}
    >
      <h1
        className={`text-[32px] font-normal leading-[1.1] tracking-tight text-[#142a5c] sm:text-[40px] ${titleClassName ?? ""}`}
      >
        {title}
      </h1>
      {subtitle ? (
        <p className={`mt-2 text-lg text-slate-500 ${subtitleClassName ?? ""}`}>{subtitle}</p>
      ) : null}
      <div className={`mt-7 space-y-5 ${contentClassName ?? ""}`}>{children}</div>
      {footer ? <div className="mt-8">{footer}</div> : null}
    </section>
  );
}

// ─── Primary Button (dark navy) ───────────────────────────────────────────────
export function PrimaryButton({
  children,
  onClick,
  disabled,
  className,
  inline,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  inline?: boolean;
}) {
  const btn = (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full bg-[#142a5c] px-12 py-4 text-[17px] font-bold text-white transition hover:bg-[#0f2148] disabled:cursor-not-allowed disabled:bg-[#9099ad] disabled:text-[#c8cdd8] ${className ?? ""}`}
    >
      <span>{children}</span>
      <span className="text-[20px] leading-none">&rarr;</span>
    </button>
  );
  if (inline) return btn;
  return <div className="mt-8 flex justify-center">{btn}</div>;
}

// ─── Option Card (large selectable card) ──────────────────────────────────────
export function OptionCard({
  active,
  onClick,
  children,
  className,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border-2 px-4 py-4 text-left text-[17px] leading-snug transition ${
        active
          ? "border-[#2aa89c] bg-[#edf7f6] text-[#0f1b3a]"
          : "border-slate-200 bg-[#f7f8fa] text-slate-600 hover:border-[#2aa89c]/60"
      } ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

// ─── Chip (small selectable pill) ─────────────────────────────────────────────
export function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2.5 text-[15px] transition ${
        active
          ? "border-[#2aa89c] bg-[#edf7f6] font-medium text-[#0f1b3a]"
          : "border-slate-200 bg-white text-slate-600 hover:border-[#2aa89c]/60"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Form Field Wrapper ───────────────────────────────────────────────────────
export function Field({
  label,
  children,
  labelClassName,
}: {
  label: string;
  children: ReactNode;
  labelClassName?: string;
}) {
  return (
    <label className="block">
      <span className={`mb-1.5 block text-[15px] font-semibold text-[#1c2846] ${labelClassName ?? ""}`}>
        {label}
      </span>
      {children}
    </label>
  );
}

// ─── Text Input ───────────────────────────────────────────────────────────────
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-slate-200 bg-[#f7f8fa] px-4 py-3.5 text-[17px] text-[#16213f] outline-none transition placeholder:text-slate-400 focus:border-[#2aa89c] focus:ring-2 focus:ring-[#2aa89c]/20 ${props.className ?? ""}`}
    />
  );
}

// ─── TextArea ─────────────────────────────────────────────────────────────────
export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-slate-200 bg-[#f7f8fa] px-4 py-3.5 text-[17px] text-[#16213f] outline-none transition placeholder:text-slate-400 focus:border-[#2aa89c] focus:ring-2 focus:ring-[#2aa89c]/20 ${props.className ?? ""}`}
    />
  );
}

// ─── Review Block ─────────────────────────────────────────────────────────────
export function ReviewBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f8f9fc] p-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">{title}</h3>
      <div className="mt-2.5 space-y-1 text-[17px] text-[#17244a]">{children}</div>
    </div>
  );
}

// ─── Status Card (confirmation screen) ────────────────────────────────────────
export function StatusCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f8f9fc] p-5">
      <h3 className="text-lg font-extrabold text-[#12214a]">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-slate-600">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#36b395]" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Gift Box Illustration (Screen 1) ─────────────────────────────────────────
// An elegant SVG-based shipping box with a live-updating label.
// Matches the Lovable/Gifterbell reference design proportions.
export function GiftBoxIllustration({ name, className }: { name: string; className?: string }) {
  const safeName = name.trim() || "\u2026";
  return (
    <div className={`mx-auto w-full ${className ?? ""}`}>
      {/* Outer box container */}
      <div className="relative mx-auto w-[195px] sm:w-[210px]">
        {/* Box shadow */}
        <div className="absolute bottom-[-3px] left-2 right-2 h-2.5 rounded-[50%] bg-slate-200/50" />

        {/* Main box body */}
        <div className="relative h-[105px] rounded-[7px] border border-[#d4cdb5] bg-gradient-to-b from-[#e8e0cd] to-[#ddd4c0] shadow-sm sm:h-[112px]">
          {/* Box lid / top flap */}
          <div className="absolute inset-x-[-3px] top-[-8px] h-[16px] rounded-t-[7px] border border-[#d4cdb5] bg-[#ede5d4]" />
          {/* Center ribbon on lid */}
          <div className="absolute left-1/2 top-[-10px] h-[14px] w-[32px] -translate-x-1/2 rounded-sm bg-[#c5d4da]/60" />

          {/* Translucent bow */}
          <svg
            className="absolute left-1/2 top-[-34px] h-[42px] w-[76px] -translate-x-1/2"
            viewBox="0 0 56 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            {/* Left ribbon loop - pinched at center, flatter edges */}
            <path
              d="M28 16 C24 4, 4 4, 3 10 C2 16, 18 22, 28 16Z"
              fill="#b8d5df" opacity="0.35"
            />
            <path
              d="M28 16 C24 4, 4 4, 3 10 C2 16, 18 22, 28 16Z"
              stroke="#9abcc9" strokeWidth="0.7" opacity="0.5"
            />
            {/* Right ribbon loop */}
            <path
              d="M28 16 C32 4, 52 4, 53 10 C54 16, 38 22, 28 16Z"
              fill="#b8d5df" opacity="0.35"
            />
            <path
              d="M28 16 C32 4, 52 4, 53 10 C54 16, 38 22, 28 16Z"
              stroke="#9abcc9" strokeWidth="0.7" opacity="0.5"
            />
            {/* Left tail */}
            <path d="M26 18 Q18 24 10 28" stroke="#9abcc9" strokeWidth="1.2" opacity="0.4" fill="none" strokeLinecap="round" />
            {/* Right tail */}
            <path d="M30 18 Q38 24 46 28" stroke="#9abcc9" strokeWidth="1.2" opacity="0.4" fill="none" strokeLinecap="round" />
            {/* Center knot */}
            <ellipse cx="28" cy="16" rx="3.5" ry="4" fill="#a3ccd8" opacity="0.5" />
            <ellipse cx="28" cy="16" rx="3.5" ry="4" stroke="#9abcc9" strokeWidth="0.5" opacity="0.4" />
          </svg>

          {/* Striped tape left */}
          <div className="absolute left-0 top-[8px] h-[calc(100%-8px)] w-[8px] rounded-l-[7px] bg-[repeating-linear-gradient(135deg,#b8d5df_0_5px,transparent_5px_10px)] opacity-60" />
          {/* Striped tape right */}
          <div className="absolute right-0 top-[8px] h-[calc(100%-8px)] w-[8px] rounded-r-[7px] bg-[repeating-linear-gradient(135deg,#b8d5df_0_5px,transparent_5px_10px)] opacity-60" />

          {/* Shipping label */}
          <div className="absolute left-1/2 top-[24px] w-[70%] -translate-x-1/2 rounded-md border border-[#dce1e6] bg-white px-3 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <p className="text-[9px] font-medium tracking-wide text-slate-400">For:</p>
            <p className="mt-0.5 truncate text-[15px] font-bold capitalize leading-tight text-[#1a2546] sm:text-[16px]">
              {safeName}
            </p>
            {/* Barcode decoration */}
            <div className="mt-1 ml-auto h-[4px] w-[18px] bg-[repeating-linear-gradient(90deg,#9ca3af_0_2px,transparent_2px_4px)] opacity-40" />
          </div>

          {/* Curved arrow decoration */}
          <svg
            className="absolute right-[12px] top-[-12px] h-[22px] w-[22px] text-slate-400/50"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M6 7c8-6 20 1 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M17 21l5 1-3 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Flow Step (wrapper for each step in the vertical flow) ──────────────────
export const FlowStep = forwardRef<HTMLDivElement, { active: boolean; children: ReactNode; viewportHeight?: number }>(
  function FlowStep({ active, children, viewportHeight }, ref) {
    return (
      <div
        ref={ref}
        className="flow-step w-full px-4 sm:px-6"
        data-active={active}
        aria-hidden={!active}
        tabIndex={active ? undefined : -1}
        style={viewportHeight ? { minHeight: viewportHeight } : undefined}
      >
        <div className="w-full py-4 sm:py-6">{children}</div>
      </div>
    );
  },
);

// ─── Flow Viewport (vertical scrolling container) ────────────────────────────
export function FlowViewport({
  currentIdx,
  stepCount,
  children,
}: {
  currentIdx: number;
  stepCount: number;
  children: (viewportHeight: number) => ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [stepHeights, setStepHeights] = useState<number[]>([]);
  const [viewportHeight, setViewportHeight] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Measure viewport height
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setViewportHeight(entry.contentRect.height);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Measure all step heights
  const measureSteps = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const steps = track.querySelectorAll<HTMLDivElement>(".flow-step");
    const heights: number[] = [];
    steps.forEach((step) => {
      heights.push(step.offsetHeight);
    });
    setStepHeights(heights);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => measureSteps());
    const track = trackRef.current;
    if (!track) return () => cancelAnimationFrame(raf);
    const ro = new ResizeObserver(() => measureSteps());
    ro.observe(track);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [measureSteps, stepCount]);

  // Compute translateY offset: sum of heights of steps before currentIdx
  let offset = 0;
  for (let i = 0; i < currentIdx && i < stepHeights.length; i++) {
    offset += stepHeights[i];
  }

  return (
    <div
      ref={viewportRef}
      className="flow-viewport"
      style={{ height: "calc(100dvh - 72px)" }}
    >
      <div
        ref={trackRef}
        className="flow-track"
        style={{ transform: `translateY(-${offset}px)` }}
      >
        {children(viewportHeight)}
      </div>
    </div>
  );
}

// ─── Modal Overlay ────────────────────────────────────────────────────────────
export function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f1734]/50 p-4 backdrop-blur-sm">
      <div className="flow-fade w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200 sm:p-8">
        {children}
      </div>
    </div>
  );
}
