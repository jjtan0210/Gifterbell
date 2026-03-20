"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Baby, PawPrint, UserRound,
  Dog, Cat, Palette, Hammer, Car, House, Drama, Bone as DinoIcon,
  BookOpen, Music, Puzzle, ChessKnight, Microscope, Trophy, TreePine,
  Monitor, CookingPot, Flower2, Rocket, Calendar,
  Coffee, Leaf, Wine, UtensilsCrossed, Dumbbell, Mountain, Plane,
  Tv, Cpu, Sofa, Sparkles, PartyPopper, PenTool,
} from "lucide-react";
import { OccasionIllustration } from "./occasion-illustrations";
import {
  AGE_RANGES,
  ADULT_AGE_RANGES,
  ADULT_INTEREST_OPTIONS,
  BUDGET_OPTIONS,
  ChildFlowData,
  INITIAL_CHILD_FLOW,
  INTEREST_OPTIONS,
  OCCASIONS,
  PET_OCCASIONS,
  PET_AGE_RANGES,
  PET_SIZE_OPTIONS,
  PET_GIFT_STYLE_OPTIONS,
  StepId,
  type AdultGiftVibeOption,
  type PetGiftStyleOption,
} from "./config";
import {
  getEstimatedDeliveryDate,
  getMinDeliveryDate,
  getVisibleSteps,
  isAnimationFrame,
  isSelected,
  toDisplayOccasion,
  validateStep,
} from "./logic";
import {
  Field,
  FlowStep,
  FlowViewport,
  GiftBoxIllustration,
  Input,
  OptionCard,
  PrimaryButton,
  ProgressHeader,
  StepLayout,
  TextArea,
} from "./ui";

// ─── Animation Frame Component ───────────────────────────────────────────────
function AnimationFrame({
  lines,
  onComplete,
  delay = 2500,
  active = false,
  center = false,
  textClassName,
  lineSpacing = "mt-4",
}: {
  lines: React.ReactNode[];
  onComplete: () => void;
  delay?: number;
  active?: boolean;
  center?: boolean;
  textClassName?: string;
  lineSpacing?: string;
}) {
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [active, onComplete, delay, lines.length]);

  const sizeClass = textClassName || "text-[32px] sm:text-[42px]";

  return (
    <div className={`flex min-h-[40vh] flex-col justify-center px-6 sm:px-10 ${center ? "items-center" : "items-start"}`}>
      {lines.map((line, i) => (
        <p
          key={i}
          className={`anim-line-${i + 1} ${center ? "text-center" : "text-left"} ${sizeClass} font-normal leading-[1.15] tracking-tight text-[#142a5c]${i > 0 ? ` ${lineSpacing}` : ""}`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

// ─── Main Flow Component ──────────────────────────────────────────────────────
export function ChildGiftFlow() {
  const [data, setData] = useState<ChildFlowData>(INITIAL_CHILD_FLOW);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [error, setError] = useState("");

  // Scroll to top on mount to avoid scroll position carryover from homepage
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const visibleSteps = useMemo(() => getVisibleSteps(data), [data]);
  const stepId = visibleSteps[currentIdx] as StepId | undefined;

  // For progress display, exclude animation frames from the count
  const actionableSteps = visibleSteps.filter((s) => !isAnimationFrame(s));
  const currentActionableIdx = actionableSteps.indexOf(stepId as StepId);
  const progressCurrent = Math.max(1, currentActionableIdx + 1);
  const progressTotal = actionableSteps.length;

  const isAdult = data.recipientType === "adult";
  const isPet = data.recipientType === "pet";
  const displayName = isPet
    ? (data.firstName || "your pet")
    : isAdult
    ? (data.firstName || "this person")
    : data.isUnbornChild ? (data.firstName || "the baby") : (data.firstName || "this child");

  function update(patch: Partial<ChildFlowData>) {
    setData((prev) => ({ ...prev, ...patch }));
    setError("");
  }

  function toggleInterest(item: string) {
    setData((prev) => {
      const exists = prev.interests.includes(item);
      const next = exists ? prev.interests.filter((x) => x !== item) : [...prev.interests, item];
      return {
        ...prev,
        interests: next,
        interestsOther: item === "Other specific interests" && exists ? "" : prev.interestsOther,
      };
    });
    setError("");
  }

  function goBack() {
    if (currentIdx === 0) {
      window.location.href = "/";
      return;
    }
    // Skip animation frames when going back
    let prevIdx = currentIdx - 1;
    while (prevIdx > 0 && isAnimationFrame(visibleSteps[prevIdx])) {
      prevIdx--;
    }
    setCurrentIdx(prevIdx);
    setError("");
  }

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submitOrder() {
    setSubmitting(true);
    setError("");
    try {
      if (!supabase) {
        throw new Error("Supabase is not configured");
      }
      const { error: dbError } = await supabase.from("gift_orders").insert({
        customer_first_name: data.customerFirstName,
        customer_email: data.customerEmail,
        recipient_type: data.recipientType,
        first_name: data.firstName,
        recipient_last_name: data.recipientLastName,
        is_unborn_child: data.isUnbornChild,
        occasion: data.occasion,
        occasion_other: data.occasionOther,
        occasion_date: data.occasionDate,
        occasion_date_unsure: data.occasionDateUnsure,
        age_range: data.ageRange,
        interests: data.interests,
        interests_other: data.interestsOther,
        gift_style: data.giftStyle,
        adult_gift_vibe: data.adultGiftVibe,
        pet_type: data.petType,
        pet_size: data.petSize,
        pet_gift_style: data.petGiftStyle,
        avoidances: data.avoidances,
        other_avoidance: data.otherAvoidance,
        budget: data.budget,
        custom_budget: data.customBudget,
        arrive_by_date: data.arriveByDate,
        gift_signature: data.giftSignature,
        use_custom_message: data.useCustomMessage,
        custom_message: data.customMessage,
        gift_wrapped: data.giftWrapped,
        recurring_enabled: data.recurringEnabled,
        recurring_delivery_month_day: data.recurringDeliveryMonthDay,
        street: data.street,
        apt: data.apt,
        city: data.city,
        state: data.state,
        zip: data.zip,
      });
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function goNext() {
    if (stepId && !validateStep(stepId, data)) {
      setError("Please complete the required fields to continue.");
      return;
    }
    if (currentIdx < visibleSteps.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  }

  // Stable callback for animation frames
  const animAdvance = useCallback(() => {
    setCurrentIdx((prev) => {
      const steps = getVisibleSteps(data);
      return prev < steps.length - 1 ? prev + 1 : prev;
    });
  }, [data]);

  // ─── Render each step by ID ─────────────────────────────────────────
  function renderStep(sid: StepId, isActive: boolean) {
    switch (sid) {
      // ── Frame 1: Customer Info ──────────────────────────────────────
      case "customerInfo":
        return (
          <StepLayout
            title="Before we begin, what's your name and email?"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-16 space-y-5"
          >
            <input
              placeholder="First Name"
              value={data.customerFirstName}
              onChange={(e) => update({ customerFirstName: e.target.value })}
              autoFocus
              className="w-full rounded-t-lg border-0 border-b-2 border-slate-300 bg-slate-100 px-4 py-4 text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c] focus:bg-slate-50"
            />
            <input
              type="email"
              placeholder="Email"
              value={data.customerEmail}
              onChange={(e) => update({ customerEmail: e.target.value.toLowerCase() })}
              className="!mt-10 w-full rounded-t-lg border-0 border-b-2 border-slate-300 bg-slate-100 px-4 py-4 text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c] focus:bg-slate-50"
            />
            {error && stepId === "customerInfo" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <PrimaryButton
              onClick={goNext}
              disabled={!validateStep("customerInfo", data)}
            >
              Continue
            </PrimaryButton>
          </StepLayout>
        );

      // ── Frame 2: Greeting Animation ─────────────────────────────────
      case "greeting":
        return (
          <div className="pt-24">
            <AnimationFrame
              lines={[
                <>Nice to meet you, <span className="font-bold">{data.customerFirstName}</span>!</>,
                <>Let&rsquo;s get started.</>,
              ]}
              onComplete={animAdvance}
              delay={1500}
              active={isActive}
              center
              textClassName="text-[38px] sm:text-[50px]"
              lineSpacing="mt-10"
            />
          </div>
        );

      // ── Frame 3: Recipient Type ─────────────────────────────────────
      case "recipientType":
        return (
          <StepLayout
            title="Who is this gift for?"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[36px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]"
            contentClassName="mt-16 space-y-5"
          >
            <div className="grid grid-cols-3 gap-3">
              {(["child", "adult", "pet"] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => update({ recipientType: type })}
                  className={`inline-flex flex-col items-center justify-center gap-2 rounded-2xl border-2 px-4 py-5 text-[16px] font-medium transition ${
                    data.recipientType === type
                      ? "border-[#2aa89c] bg-[#edf7f6] text-[#1a2748]"
                      : "border-slate-200 bg-white text-slate-500 hover:border-[#2aa89c]/60"
                  }`}
                >
                  {type === "child" && <Baby className="h-[34px] w-[34px]" />}
                  {type === "adult" && <UserRound className="h-[34px] w-[34px]" />}
                  {type === "pet" && <PawPrint className="h-[34px] w-[34px]" />}
                  <span>{type === "child" ? "A Child" : type === "adult" ? "An Adult" : "A Pet"}</span>
                  {type === "child" && <span className="text-[12px] italic text-slate-400 font-normal">(&lt;18)</span>}
                  {type === "adult" && <span className="text-[12px] italic text-slate-400 font-normal">(18+)</span>}
                  {type === "pet" && <span className="text-[12px] italic text-slate-400 font-normal">(Dog or Cat)</span>}
                </button>
              ))}
            </div>
            <div className="!mt-8 flex justify-center">
              <PrimaryButton
                onClick={goNext}
                disabled={!validateStep("recipientType", data)}
                className="!w-auto rounded-[16px] px-12 py-4 text-[17px]"
              >
                Continue
              </PrimaryButton>
            </div>
          </StepLayout>
        );

      // ── Pet Type ─────────────────────────────────────────────────────
      case "petType":
        return (
          <StepLayout
            title="What kind of pet is this for?"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[36px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]"
            contentClassName="mt-16 space-y-5"
          >
            <div className="mx-auto grid max-w-[320px] gap-3">
              {(["dog", "cat"] as const).map((type) => (
                <OptionCard
                  key={type}
                  active={data.petType === type}
                  onClick={() => update({ petType: type })}
                  className="!rounded-full !py-4 !text-[17px] !text-center"
                >
                  <span className="inline-flex items-center gap-2">
                    {type === "dog" ? <Dog className="h-5 w-5" /> : <Cat className="h-5 w-5" />}
                    {type === "dog" ? "Dog" : "Cat"}
                  </span>
                </OptionCard>
              ))}
            </div>
            {error && stepId === "petType" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <div className="!mt-8 flex justify-center">
              <PrimaryButton
                onClick={goNext}
                disabled={!validateStep("petType", data)}
                className="!w-auto rounded-[16px] px-12 py-4 text-[17px]"
              >
                Continue
              </PrimaryButton>
            </div>
          </StepLayout>
        );

      // ── Frame 4: Recipient Name ─────────────────────────────────────
      case "recipientName":
        return (
          <StepLayout
            title={isPet ? "What is the pet's name?" : isAdult ? "What is their name?" : "What's the child's name?"}
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[36px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]"
            contentClassName="mt-28 space-y-5"
          >
            <GiftBoxIllustration name={data.firstName} className="mt-4 sm:mt-6" />
            <div className="!mt-10 flex gap-3">
              <input
                placeholder="First Name"
                value={data.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
                autoFocus
                className="flex-1 rounded-t-lg border-0 border-b-2 border-slate-300 bg-slate-100 px-4 py-4 text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c] focus:bg-slate-50"
              />
              {!isPet && (
                <input
                  placeholder="Last Name"
                  value={data.recipientLastName}
                  onChange={(e) => update({ recipientLastName: e.target.value })}
                  className="flex-1 rounded-t-lg border-0 border-b-2 border-slate-300 bg-slate-100 px-4 py-4 text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c] focus:bg-slate-50"
                />
              )}
            </div>
            {!isAdult && !isPet && (
              <label className="!mt-6 flex items-center justify-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.isUnbornChild}
                  onChange={(e) => update({ isUnbornChild: e.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-[#2aa89c] focus:ring-[#2aa89c]"
                />
                <span className="text-[15px] text-slate-600"><em>Name unknown</em> - this is for an unborn child</span>
              </label>
            )}
            {error && stepId === "recipientName" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <div className="!mt-8 flex justify-center">
              <PrimaryButton
                onClick={goNext}
                disabled={!validateStep("recipientName", data)}
                className="!w-auto rounded-[16px] px-12 py-4 text-[17px]"
              >
                Continue
              </PrimaryButton>
            </div>
          </StepLayout>
        );

      // ── Frame 5: Occasion ───────────────────────────────────────────
      case "occasion":
        return (
          <StepLayout
            title="What's the occasion?"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[36px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]"
            contentClassName="mt-3 space-y-3"
          >
            <div className="grid grid-cols-3 gap-2">
              {(isPet ? PET_OCCASIONS : OCCASIONS).map((occasion) => (
                <button
                  key={occasion}
                  type="button"
                  onClick={() =>
                    update({
                      occasion,
                      occasionOther: occasion === "Other" ? data.occasionOther : "",
                      occasionDate: { month: "", day: "", year: "" },
                    })
                  }
                  className={`flex h-[110px] flex-col items-center justify-center gap-0.5 rounded-sm border-2 px-2 py-1.5 text-center text-[12px] font-medium leading-tight transition ${
                    isSelected(data.occasion, occasion)
                      ? "border-[#2aa89c] bg-[#edf7f6] text-[#0f1b3a]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#2aa89c]/60"
                  }`}
                >
                  <OccasionIllustration occasion={occasion} className="h-[56px] w-[56px]" />
                  <span>{occasion}</span>
                </button>
              ))}
            </div>
            {data.occasion === "Other" && (
              <Field label="Tell us the occasion" labelClassName="text-[15px] font-semibold text-[#1a2748]">
                <Input
                  placeholder="Type the occasion"
                  value={data.occasionOther}
                  onChange={(e) => update({ occasionOther: e.target.value })}
                  className="rounded-[16px] border-2 border-[#2aa89c] bg-white px-4 py-3.5 !text-[14px] ring-2 ring-[#2aa89c]/20"
                />
              </Field>
            )}
            {error && stepId === "occasion" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <div className="!mt-4 flex justify-center">
              <PrimaryButton
                onClick={goNext}
                disabled={!validateStep("occasion", data)}
                className="!w-auto rounded-[16px] px-12 py-3.5 text-[17px]"
              >
                Continue
              </PrimaryButton>
            </div>
          </StepLayout>
        );

      // ── Frame 6: Thanks Animation ───────────────────────────────────
      case "thanksAnim":
        return (
          <div className="pt-24">
            <AnimationFrame
              lines={[
                "Thanks!",
                `Let\u2019s get more details to find the right gift for ${displayName}.`,
              ]}
              onComplete={animAdvance}
              delay={1500}
              active={isActive}
              center
              lineSpacing="mt-10"
            />
          </div>
        );

      // ── Frame 7A: Birthday Date ─────────────────────────────────────
      case "birthdayDate":
        return (
          <StepLayout
            title={`When is ${displayName}\u2019s birthday?`}
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-16 space-y-5"
          >
            <div className="flex items-end justify-center gap-3">
              <input
                placeholder="MM"
                value={data.occasionDate.month}
                onChange={(e) => update({ occasionDate: { ...data.occasionDate, month: e.target.value }, occasionDateUnsure: false })}
                className="w-[80px] border-0 border-b-2 border-slate-300 bg-transparent px-2 py-3 text-center text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c]"
                maxLength={2}
              />
              <span className="pb-3 text-2xl text-slate-400">/</span>
              <input
                placeholder="DD"
                value={data.occasionDate.day}
                onChange={(e) => update({ occasionDate: { ...data.occasionDate, day: e.target.value }, occasionDateUnsure: false })}
                className="w-[80px] border-0 border-b-2 border-slate-300 bg-transparent px-2 py-3 text-center text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c]"
                maxLength={2}
              />
              <span className="pb-3 text-2xl text-slate-400">/</span>
              <input
                placeholder="YYYY"
                value={data.occasionDate.year}
                onChange={(e) => update({ occasionDate: { ...data.occasionDate, year: e.target.value }, occasionDateUnsure: false })}
                className="w-[100px] border-0 border-b-2 border-slate-300 bg-transparent px-2 py-3 text-center text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c]"
                maxLength={4}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => update({ occasionDateUnsure: true, occasionDate: { month: "", day: "", year: "" } })}
                className={`rounded-full border-2 px-6 py-3 text-[15px] font-medium transition ${
                  data.occasionDateUnsure
                    ? "border-[#2aa89c] bg-[#edf7f6] text-[#1a2748]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                I&apos;m not sure
              </button>
            </div>
            <div className="!mt-8 flex justify-center">
              <PrimaryButton
                onClick={goNext}
                disabled={!validateStep("birthdayDate", data)}
                className="!w-auto rounded-[16px] px-12 py-3.5 text-[17px]"
              >
                Continue
              </PrimaryButton>
            </div>
          </StepLayout>
        );

      // ── Frame 7B: Anniversary Date ──────────────────────────────────
      case "anniversaryDate":
        return (
          <StepLayout
            title="When is your anniversary?"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-32 space-y-5"
          >
            <div className="flex items-end justify-center gap-3">
              <input
                placeholder="MM"
                value={data.occasionDate.month}
                onChange={(e) => update({ occasionDate: { ...data.occasionDate, month: e.target.value } })}
                className="w-[80px] border-0 border-b-2 border-slate-300 bg-transparent px-2 py-3 text-center text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c]"
                maxLength={2}
              />
              <span className="pb-3 text-2xl text-slate-400">/</span>
              <input
                placeholder="DD"
                value={data.occasionDate.day}
                onChange={(e) => update({ occasionDate: { ...data.occasionDate, day: e.target.value } })}
                className="w-[80px] border-0 border-b-2 border-slate-300 bg-transparent px-2 py-3 text-center text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c]"
                maxLength={2}
              />
              <span className="pb-3 text-2xl text-slate-400">/</span>
              <input
                placeholder="YYYY"
                value={data.occasionDate.year}
                onChange={(e) => update({ occasionDate: { ...data.occasionDate, year: e.target.value } })}
                className="w-[100px] border-0 border-b-2 border-slate-300 bg-transparent px-2 py-3 text-center text-[20px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c]"
                maxLength={4}
              />
              <div className="relative mb-3">
                <button
                  type="button"
                  onClick={() => {
                    const picker = document.getElementById("anniversary-date-picker") as HTMLInputElement;
                    if (picker) picker.showPicker();
                  }}
                  className="text-slate-400 transition hover:text-[#2aa89c]"
                >
                  <Calendar className="h-6 w-6" />
                </button>
                <input
                  id="anniversary-date-picker"
                  type="date"
                  value={data.occasionDate.month && data.occasionDate.day && data.occasionDate.year
                    ? `${data.occasionDate.year}-${data.occasionDate.month.padStart(2, "0")}-${data.occasionDate.day.padStart(2, "0")}`
                    : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      const parts = e.target.value.split("-");
                      update({ occasionDate: { year: parts[0], month: parts[1], day: parts[2] } });
                    }
                  }}
                  className="invisible absolute left-0 top-0 h-0 w-0"
                />
              </div>
            </div>
            <div className="!mt-24 flex items-end justify-between">
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center justify-center rounded-full bg-[#9ca3af] px-8 py-4 text-[17px] font-bold text-white transition hover:bg-[#6b7280]"
              >
                <span>Skip</span>
                <span className="text-[20px] leading-none">&rarr;</span>
              </button>
              <PrimaryButton onClick={goNext} inline className="!w-auto rounded-[16px] px-8 py-4 text-[17px]">
                Continue
              </PrimaryButton>
            </div>
          </StepLayout>
        );

      // ── Frame 8: Age Range ──────────────────────────────────────────
      case "ageRange": {
        const ageOptions = isPet ? PET_AGE_RANGES : isAdult ? ADULT_AGE_RANGES : AGE_RANGES;
        return (
          <StepLayout
            title={`Approximately how old is ${displayName}?`}
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-4 space-y-3"
          >
            <div className={`grid gap-2 ${isPet ? "mx-auto max-w-[320px] grid-cols-1" : isAdult ? "mx-auto max-w-[360px] grid-cols-2" : "grid-cols-2"}`}>
              {ageOptions.map((age) => {
                const [category, range] = age.includes(":") ? age.split(":") : [age, ""];
                return (
                  <OptionCard key={age} active={data.ageRange === age} onClick={() => update({ ageRange: age })} className={isAdult || isPet ? "!rounded-full !px-3.5 !py-3.5 !text-[17px] !font-normal !text-center" : "!rounded-full !px-3.5 !py-3.5 !text-[15px]"}>
                    {isAdult || isPet ? <span>{category}</span> : <span className="font-bold">{category}</span>}{range ? `:${range}` : ""}
                  </OptionCard>
                );
              })}
            </div>
            {error && stepId === "ageRange" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <div className="!mt-4 flex justify-center">
              <PrimaryButton
                onClick={goNext}
                disabled={!validateStep("ageRange", data)}
                className="!w-auto rounded-[16px] px-12 py-3.5 text-[17px]"
              >
                Continue
              </PrimaryButton>
            </div>
          </StepLayout>
        );
      }

      // ── Pet Size ────────────────────────────────────────────────────
      case "petSize":
        return (
          <StepLayout
            title={`What size ${data.petType === "dog" ? "dog" : "cat"} is ${displayName}?`}
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-40 space-y-3"
          >
            <div className="mx-auto grid max-w-[320px] grid-cols-1 gap-2">
              {PET_SIZE_OPTIONS.map((size) => (
                <OptionCard
                  key={size}
                  active={data.petSize === size}
                  onClick={() => update({ petSize: size })}
                  className="!rounded-full !py-3.5 !text-[17px] !font-normal !text-center"
                >
                  {size}
                </OptionCard>
              ))}
            </div>
            {error && stepId === "petSize" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <div className="!mt-4 flex justify-center">
              <PrimaryButton
                onClick={goNext}
                disabled={!validateStep("petSize", data)}
                className="!w-auto rounded-[16px] px-12 py-3.5 text-[17px]"
              >
                Continue
              </PrimaryButton>
            </div>
          </StepLayout>
        );

      // ── Frame 10: Interests ─────────────────────────────────────────
      case "interests": {
        const childInterestIcons: Record<string, React.ReactNode> = {
          "Animals": <Dog className="h-4 w-4 shrink-0" />,
          "Arts & Crafts": <Palette className="h-4 w-4 shrink-0" />,
          "Building & Construction": <Hammer className="h-4 w-4 shrink-0" />,
          "Cars, Trucks & Trains": <Car className="h-4 w-4 shrink-0" />,
          "Dolls & Pretend Play": <House className="h-4 w-4 shrink-0" />,
          "Dress-Up & Imaginative Play": <Drama className="h-4 w-4 shrink-0" />,
          "Dinosaurs": <DinoIcon className="h-4 w-4 shrink-0" />,
          "Books": <BookOpen className="h-4 w-4 shrink-0" />,
          "Music": <Music className="h-4 w-4 shrink-0" />,
          "Puzzles": <Puzzle className="h-4 w-4 shrink-0" />,
          "Games": <ChessKnight className="h-4 w-4 shrink-0" />,
          "Science & STEM": <Microscope className="h-4 w-4 shrink-0" />,
          "Sports & Active Play": <Trophy className="h-4 w-4 shrink-0" />,
          "Outdoor Play": <TreePine className="h-4 w-4 shrink-0" />,
          "Video Games": <Monitor className="h-4 w-4 shrink-0" />,
          "Cooking & Baking": <CookingPot className="h-4 w-4 shrink-0" />,
          "Nature & Gardening": <Flower2 className="h-4 w-4 shrink-0" />,
          "Space": <Rocket className="h-4 w-4 shrink-0" />,
        };
        const adultInterestIcons: Record<string, React.ReactNode> = {
          "Cooking": <CookingPot className="h-4 w-4 shrink-0" />,
          "Coffee": <Coffee className="h-4 w-4 shrink-0" />,
          "Tea": <Leaf className="h-4 w-4 shrink-0" />,
          "Wine & cocktails": <Wine className="h-4 w-4 shrink-0" />,
          "Food & Drink": <UtensilsCrossed className="h-4 w-4 shrink-0" />,
          "Fitness": <Dumbbell className="h-4 w-4 shrink-0" />,
          "Outdoors": <Mountain className="h-4 w-4 shrink-0" />,
          "Travel": <Plane className="h-4 w-4 shrink-0" />,
          "Reading": <BookOpen className="h-4 w-4 shrink-0" />,
          "Music": <Music className="h-4 w-4 shrink-0" />,
          "Movies & TV": <Tv className="h-4 w-4 shrink-0" />,
          "Tech": <Cpu className="h-4 w-4 shrink-0" />,
          "Home": <Sofa className="h-4 w-4 shrink-0" />,
          "Gardening": <Flower2 className="h-4 w-4 shrink-0" />,
          "Self-care & Wellness": <Sparkles className="h-4 w-4 shrink-0" />,
          "Hosting & Entertaining": <PartyPopper className="h-4 w-4 shrink-0" />,
          "Art & design": <PenTool className="h-4 w-4 shrink-0" />,
        };
        const interestIcons = isAdult ? adultInterestIcons : childInterestIcons;
        const interestOptions = isAdult ? ADULT_INTEREST_OPTIONS : INTEREST_OPTIONS;
        const mainInterests = interestOptions.filter((i) => i !== "Other specific interests");
        return (
          <StepLayout
            title={`What is ${displayName} into?`}
            subtitle="Select all that apply"
            plain
            className="mx-auto max-w-[520px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            subtitleClassName="!mb-0"
            contentClassName="!mt-1 space-y-3"
          >
            <p className="!-mt-1 text-[15px] italic text-slate-500">
              Not sure? That&rsquo;s okay — we can still find something they&rsquo;ll like!
            </p>
            <div className="mt-4 grid grid-cols-3 gap-1.5">
              {mainInterests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`flex min-h-[46px] items-center justify-start gap-1.5 rounded-full border-2 px-3 py-2.5 text-left text-[13px] font-medium leading-tight transition ${
                    data.interests.includes(interest)
                      ? "border-[#2aa89c] bg-[#edf7f6] text-[#0f1b3a]"
                      : "border-slate-200 bg-[#f7f8fa] text-slate-600 hover:border-[#2aa89c]/60"
                  }`}
                >
                  {interestIcons[interest]}
                  <span>{interest}</span>
                </button>
              ))}
            </div>
            <input
              placeholder="Other specific interests"
              value={data.interestsOther}
              onChange={(e) => {
                update({ interestsOther: e.target.value });
                if (e.target.value.trim() && !data.interests.includes("Other specific interests")) {
                  toggleInterest("Other specific interests");
                }
                if (!e.target.value.trim() && data.interests.includes("Other specific interests")) {
                  toggleInterest("Other specific interests");
                }
              }}
              className="w-full rounded-t-lg border-0 border-b-2 border-slate-300 bg-slate-100 px-4 py-3 text-[14px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c] focus:bg-slate-50"
            />
            {error && stepId === "interests" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <div className="!mt-3 flex justify-between gap-3">
              <PrimaryButton
                onClick={goNext}
                className="!w-auto rounded-[16px] !bg-[#9ca3af] px-10 py-3.5 text-[17px] hover:!bg-[#6b7280]"
              >
                Skip
              </PrimaryButton>
              <PrimaryButton
                onClick={goNext}
                className="!w-auto rounded-[16px] px-10 py-3.5 text-[17px]"
              >
                Continue
              </PrimaryButton>
            </div>
          </StepLayout>
        );
      }

      // ── Frame 11: Gift Style ────────────────────────────────────────
      case "giftStyle": {
        if (isPet) {
          return (
            <StepLayout
              title={`What type of gifts should we lean toward for ${displayName}?`}
              subtitle="Select all that apply"
              plain
              className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
              titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
              contentClassName="mt-32 space-y-3"
            >
              <div className="mx-auto grid max-w-[360px] grid-cols-2 gap-2">
                {PET_GIFT_STYLE_OPTIONS.map((item) => (
                  <OptionCard
                    key={item.id}
                    active={data.petGiftStyle.includes(item.id)}
                    onClick={() => update({ petGiftStyle: data.petGiftStyle.includes(item.id) ? data.petGiftStyle.filter((s: PetGiftStyleOption) => s !== item.id) : [...data.petGiftStyle, item.id] })}
                    className="!rounded-full !py-3.5 !text-[15px] !text-center"
                  >
                    {item.label}
                  </OptionCard>
                ))}
              </div>
              {error && stepId === "giftStyle" && (
                <p className="text-sm font-medium text-rose-600">{error}</p>
              )}
              <PrimaryButton onClick={goNext} disabled={!validateStep("giftStyle", data)}>
                Continue
              </PrimaryButton>
            </StepLayout>
          );
        }
        const giftStyleOptions = isAdult
          ? ([
              { id: "men" as const, label: "Gifts for men" },
              { id: "women" as const, label: "Gifts for women" },
              { id: "open" as const, label: "Open to anything that fits" },
            ])
          : ([
              { id: "boy_leaning" as const, label: "Boy-oriented items" },
              { id: "girl_leaning" as const, label: "Girl-oriented items" },
              { id: "neutral" as const, label: "Gender-neutral items" },
              { id: "open" as const, label: "Open to anything that fits" },
            ]);
        return (
          <StepLayout
            title={`What type of gifts should we lean toward for ${displayName}?`}
            subtitle="Select all that apply"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-6 space-y-3"
          >
            <div className="mx-auto grid max-w-[320px] gap-2">
              {giftStyleOptions.map((item) => (
                <OptionCard
                  key={item.id}
                  active={data.giftStyle.includes(item.id)}
                  onClick={() => update({ giftStyle: data.giftStyle.includes(item.id) ? data.giftStyle.filter((s) => s !== item.id) : [...data.giftStyle, item.id] })}
                  className="!py-4 !text-[16px]"
                >
                  {item.label}
                </OptionCard>
              ))}
            </div>
            {error && stepId === "giftStyle" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <PrimaryButton onClick={goNext} disabled={!validateStep("giftStyle", data)}>
              Continue
            </PrimaryButton>
          </StepLayout>
        );
      }

      // ── Frame 11b: Adult Gift Vibe ─────────────────────────────────
      case "adultGiftVibe":
        return (
          <StepLayout
            title="Which gift styles are you open to sending?"
            subtitle="Select all that apply"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-6 space-y-3"
          >
            <div className="mx-auto grid max-w-[360px] grid-cols-2 gap-2">
              {([
                { id: "practical" as AdultGiftVibeOption, label: "Practical" },
                { id: "thoughtful" as AdultGiftVibeOption, label: "Thoughtful" },
                { id: "playful" as AdultGiftVibeOption, label: "Playful / Funny" },
                { id: "subtle_neutral" as AdultGiftVibeOption, label: "Subtle neutral colors" },
                { id: "bright_vibrant" as AdultGiftVibeOption, label: "Bright, vibrant colors" },
                { id: "open_anything" as AdultGiftVibeOption, label: "Open to anything that fits" },
              ]).map((item) => (
                <OptionCard
                  key={item.id}
                  active={data.adultGiftVibe.includes(item.id)}
                  onClick={() => update({ adultGiftVibe: data.adultGiftVibe.includes(item.id) ? data.adultGiftVibe.filter((s) => s !== item.id) : [...data.adultGiftVibe, item.id] })}
                  className={`!rounded-full !py-3.5 !text-[15px] !text-center ${item.id === "open_anything" ? "col-start-2" : ""}`}
                >
                  {item.label}
                </OptionCard>
              ))}
            </div>
            {error && stepId === "adultGiftVibe" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <PrimaryButton onClick={goNext} disabled={!validateStep("adultGiftVibe", data)}>
              Continue
            </PrimaryButton>
          </StepLayout>
        );

      // ── Frame 12: Avoid ─────────────────────────────────────────────
      case "avoid":
        return (
          <StepLayout
            title="Anything we should avoid?"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-14 space-y-5"
          >
            <textarea
              placeholder={isPet ? "Examples: no squeaky toys, no chicken...." : isAdult ? "Examples: no scented items, no nuts or other allergens..." : "Examples: no princess items, no dinosaurs, avoid Bluey because they already have a lot..."}
              value={data.otherAvoidance}
              onChange={(e) => update({ otherAvoidance: e.target.value })}
              rows={5}
              className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-4 text-[15px] text-[#101b3d] outline-none placeholder:text-slate-400 focus:border-[#2aa89c] focus:bg-white"
            />
            <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          </StepLayout>
        );

      // ── Frame 13: Covered Animation ─────────────────────────────────
      case "coveredAnim": {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (!isActive) return;
          const timer = setTimeout(animAdvance, 2200);
          return () => clearTimeout(timer);
        }, [isActive, animAdvance]);
        return (
          <div className="flex min-h-[40vh] flex-col items-start justify-center px-6 pt-24 sm:px-10">
            <p className="anim-line-1 text-left text-[32px] font-normal leading-[1.15] tracking-tight text-[#142a5c] sm:text-[42px]">
              We got you covered!
            </p>
            <p className="anim-line-2 mt-12 text-left text-[32px] font-normal leading-[1.15] tracking-tight text-[#142a5c] sm:text-[42px]">
              We&rsquo;ll help you find something for {displayName}.
            </p>
            <p className="anim-line-3-delayed mt-12 text-left text-[32px] font-normal leading-[1.15] tracking-tight text-[#142a5c] sm:text-[42px]">
              <span className="font-bold">Next up:</span> Budget &amp; Delivery
            </p>
          </div>
        );
      }

      // ── Frame 14: Budget ────────────────────────────────────────────
      case "budget":
        return (
          <StepLayout
            title={`What is your budget for ${displayName}\u2019s gift?`}
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-8 space-y-3"
          >
            <div className="mx-auto flex max-w-[320px] flex-col gap-3">
              {BUDGET_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  active={data.budget === option.id}
                  className="!rounded-full !text-center"
                  onClick={() =>
                    update({
                      budget: option.id,
                      customBudget: option.id === "above_250" ? data.customBudget : "",
                    })
                  }
                >
                  {option.label}
                </OptionCard>
              ))}
            </div>
            {data.budget === "above_250" && (
              <Field label="Enter your budget (must be above $250)">
                <Input
                  type="number"
                  min={251}
                  placeholder="Enter Your Budget"
                  value={data.customBudget}
                  onChange={(e) => update({ customBudget: e.target.value })}
                />
              </Field>
            )}
            {error && stepId === "budget" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <PrimaryButton onClick={goNext} disabled={!validateStep("budget", data)}>
              Continue
            </PrimaryButton>
          </StepLayout>
        );

      // ── Frame 15: Delivery Date ─────────────────────────────────────
      case "deliveryDate":
        return (
          <StepLayout
            title="When do you want it to arrive by?"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-16 space-y-5"
          >
            {(() => {
              const clean = (v: string) => (v === "00" || v === "0" ? "" : v);
              let yyyy = "", mm = "", dd = "";
              if (data.arriveByDate && data.arriveByDate.startsWith("partial-")) {
                const pparts = data.arriveByDate.replace("partial-", "").split("-");
                mm = clean(pparts[0] || "");
                dd = clean(pparts[1] || "");
                yyyy = clean(pparts[2] || "");
              } else if (data.arriveByDate) {
                const parts = data.arriveByDate.split("-");
                yyyy = clean(parts[0] || "");
                mm = clean(parts[1] || "");
                dd = clean(parts[2] || "");
              }
              const buildDate = (m: string, d: string, y: string) => {
                if (m && d && y && y.length === 4) return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
                if (m || d || y) return `partial-${m}-${d}-${y}`;
                return "";
              };
              return (
                <div className="flex items-end justify-center gap-2">
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      placeholder="MM"
                      value={mm}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                        update({ arriveByDate: buildDate(v, dd, yyyy) });
                      }}
                      className="w-16 border-0 border-b-2 border-slate-300 bg-transparent py-2 text-center text-[22px] text-[#101b3d] outline-none focus:border-[#2aa89c]"
                    />
                  </div>
                  <span className="pb-2 text-[22px] text-slate-400">/</span>
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      placeholder="DD"
                      value={dd}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                        update({ arriveByDate: buildDate(mm, v, yyyy) });
                      }}
                      className="w-16 border-0 border-b-2 border-slate-300 bg-transparent py-2 text-center text-[22px] text-[#101b3d] outline-none focus:border-[#2aa89c]"
                    />
                  </div>
                  <span className="pb-2 text-[22px] text-slate-400">/</span>
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="YYYY"
                      value={yyyy}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                        update({ arriveByDate: buildDate(mm, dd, v) });
                      }}
                      className="w-20 border-0 border-b-2 border-slate-300 bg-transparent py-2 text-center text-[22px] text-[#101b3d] outline-none focus:border-[#2aa89c]"
                    />
                  </div>
                  <div className="relative pb-1 pl-2">
                    <button
                      type="button"
                      onClick={() => {
                        const hiddenDate = document.getElementById("delivery-date-picker") as HTMLInputElement;
                        if (hiddenDate) hiddenDate.showPicker();
                      }}
                      className="text-slate-400 transition hover:text-[#2aa89c]"
                    >
                      <Calendar className="h-6 w-6" />
                    </button>
                    <input
                      id="delivery-date-picker"
                      type="date"
                      value={data.arriveByDate.startsWith("partial") ? "" : data.arriveByDate}
                      min={getMinDeliveryDate()}
                      onChange={(e) => update({ arriveByDate: e.target.value })}
                      className="invisible absolute left-0 top-0 h-0 w-0"
                    />
                  </div>
                </div>
              );
            })()}
            {error && stepId === "deliveryDate" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <PrimaryButton onClick={goNext} disabled={!validateStep("deliveryDate", data)}>
              Continue
            </PrimaryButton>
          </StepLayout>
        );

      // ── Frame 16: Gift Message ──────────────────────────────────────
      case "giftMessage":
        return (
          <StepLayout
            title="How should we sign the gift message?"
            subtitle={data.occasion === "Just Because" || data.occasion === "Other" ? `We'll include a standard gift message for ${displayName}.` : `We'll include a standard ${toDisplayOccasion(data)} message for ${displayName}.`}
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-12 space-y-5"
          >
            <Field label="Gift signature:" labelClassName="text-[15px] font-semibold text-[#1a2748]">
              <Input
                placeholder="Example: Love, Sarah & Family"
                value={data.giftSignature}
                onChange={(e) => update({ giftSignature: e.target.value })}
                className="rounded-[16px] border-2 border-[#2aa89c] bg-white px-4 py-3.5 !text-[14px] ring-2 ring-[#2aa89c]/20"
              />
            </Field>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.useCustomMessage}
                onChange={(e) => update({ useCustomMessage: e.target.checked })}
                className="h-5 w-5 rounded border-slate-300 text-[#2aa89c] focus:ring-[#2aa89c]"
              />
              <span className="text-[15px] font-medium text-[#1a2748]">Send a custom message</span>
            </label>
            {data.useCustomMessage && (
              <div>
                <TextArea
                  rows={4}
                  maxLength={220}
                  placeholder="Write your custom gift message..."
                  value={data.customMessage}
                  onChange={(e) => update({ customMessage: e.target.value })}
                />
                <p className="mt-1 text-right text-[12px] text-slate-400">
                  {data.customMessage.length}/220
                </p>
              </div>
            )}
            {error && stepId === "giftMessage" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <PrimaryButton onClick={goNext} disabled={!validateStep("giftMessage", data)}>
              Continue
            </PrimaryButton>
          </StepLayout>
        );

      // ── Frame 17: Gift Wrapped ──────────────────────────────────────
      case "giftWrapped":
        return (
          <StepLayout
            title="Would you like this gift wrapped?"
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-16 space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <OptionCard active={data.giftWrapped === "yes"} onClick={() => update({ giftWrapped: "yes" })} className="!rounded-full !text-center">
                Yes
              </OptionCard>
              <OptionCard active={data.giftWrapped === "no"} onClick={() => update({ giftWrapped: "no" })} className="!rounded-full !text-center">
                No
              </OptionCard>
            </div>
            <PrimaryButton onClick={goNext} disabled={!validateStep("giftWrapped", data)}>
              Continue
            </PrimaryButton>
          </StepLayout>
        );

      // ── Frame 18: Wrap Up Animation ─────────────────────────────────
      case "wrapUpAnim":
        return (
          <div className="pt-24">
            <AnimationFrame
              lines={["Let\u2019s finish up!"]}
              onComplete={animAdvance}
              delay={1500}
              active={isActive}
              center
            />
          </div>
        );

      // ── Frame 19: Review ────────────────────────────────────────────
      case "review":
        return (
          <StepLayout
            title={data.occasion === "Just Because" || data.occasion === "Other" ? `We\u2019ve scheduled ${displayName}\u2019s gift!` : `We\u2019ve scheduled ${displayName}\u2019s ${toDisplayOccasion(data)} gift!`}
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-10 space-y-5"
          >
            {/* Editable delivery date */}
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-medium text-slate-500">Delivery date:</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    const picker = document.getElementById("review-date-picker") as HTMLInputElement;
                    if (picker) picker.showPicker();
                  }}
                  className="flex items-center gap-2 rounded-[12px] border border-[#2aa89c] bg-white px-4 py-2 text-[14px] font-medium text-[#101b3d] hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>{(() => {
                    const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                    if (data.arriveByDate && !data.arriveByDate.startsWith("partial")) {
                      const parts = data.arriveByDate.split("-");
                      if (parts.length === 3) {
                        const m = parseInt(parts[1], 10);
                        const d = parseInt(parts[2], 10);
                        return `${MONTHS[m - 1]} ${d}, ${parts[0]}`;
                      }
                    }
                    return "Select date";
                  })()}</span>
                  <Calendar className="h-4 w-4 text-slate-400" />
                </button>
                <input
                  id="review-date-picker"
                  type="date"
                  value={data.arriveByDate.startsWith("partial") ? "" : data.arriveByDate}
                  min={getMinDeliveryDate()}
                  onChange={(e) => update({ arriveByDate: e.target.value })}
                  className="invisible absolute left-0 top-0 h-0 w-0"
                />
              </div>
            </div>

            {/* Checklist box */}
            <div className="rounded-2xl border border-slate-200 bg-[#f8f9fc] p-5">
              <h3 className="text-[15px] font-bold text-[#12214a]">The right gift, picked and sent for you</h3>
              <ul className="mt-3 space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#36b395] text-white text-xs">✓</span>
                  <span className="text-[15px] text-[#17244a]">
                    Within your {BUDGET_OPTIONS.find((b) => b.id === data.budget)?.label ?? ""}{data.budget === "above_250" ? ` ($${data.customBudget})` : ""} budget
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#36b395] text-white text-xs">✓</span>
                  <span className="text-[15px] text-[#17244a]">Tailored to {displayName}&apos;s age and interests</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#36b395] text-white text-xs">✓</span>
                  <span className="text-[15px] text-[#17244a]">
                    {data.useCustomMessage ? "Customized gift message signed from you" : "Gift message signed from you"}
                  </span>
                </li>
                {data.giftWrapped === "yes" && (
                  <li className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#36b395] text-white text-xs">✓</span>
                    <span className="text-[15px] text-[#17244a]">Gift wrapped</span>
                  </li>
                )}
              </ul>
            </div>
            <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          </StepLayout>
        );

      // ── Frame 20: Recurring ─────────────────────────────────────────
      case "recurring": {
        const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const isOpenEndedOccasion = data.occasion === "Just Because" || data.occasion === "Other";
        const threeDaysBefore = (month: number, day: number, year = 2026) => {
          const d = new Date(year, month - 1, day);
          d.setDate(d.getDate() - 3);
          return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
        };
        // Mother's Day: 2nd Sunday of May. Father's Day: 3rd Sunday of June.
        const getNthSunday = (month: number, n: number, year = 2026) => {
          const d = new Date(year, month - 1, 1);
          let count = 0;
          while (count < n) {
            if (d.getDay() === 0) count++;
            if (count < n) d.setDate(d.getDate() + 1);
          }
          return { month, day: d.getDate() };
        };
        const hasOccasionDate = !data.occasionDateUnsure && data.occasionDate.month && data.occasionDate.day;
        const getOccasionRecurringDate = (): { date: string; subtext: string } | null => {
          const occasion = data.occasion;
          if (occasion === "Birthday" && hasOccasionDate) {
            const m = parseInt(data.occasionDate.month, 10);
            const d = parseInt(data.occasionDate.day, 10);
            const y = data.occasionDate.year ? parseInt(data.occasionDate.year, 10) : 2026;
            return { date: threeDaysBefore(m, d, y), subtext: `~3 days before ${displayName}\u2019s birthday` };
          }
          if (occasion === "Anniversary" && hasOccasionDate) {
            const m = parseInt(data.occasionDate.month, 10);
            const d = parseInt(data.occasionDate.day, 10);
            const y = data.occasionDate.year ? parseInt(data.occasionDate.year, 10) : 2026;
            return { date: threeDaysBefore(m, d, y), subtext: "~3 days before anniversary" };
          }
          if (occasion === "Holiday") {
            return { date: threeDaysBefore(12, 25), subtext: "~3 days before Christmas every year" };
          }
          if (occasion === "Mother's Day") {
            const md = getNthSunday(5, 2);
            return { date: threeDaysBefore(md.month, md.day), subtext: "~3 days before Mother\u2019s Day every year" };
          }
          if (occasion === "Father's Day") {
            const fd = getNthSunday(6, 3);
            return { date: threeDaysBefore(fd.month, fd.day), subtext: "~3 days before Father\u2019s Day every year" };
          }
          if (occasion === "Valentine's Day") {
            return { date: threeDaysBefore(2, 14), subtext: "~3 days before Valentine\u2019s Day every year" };
          }
          return null;
        };
        const occasionRecurring = getOccasionRecurringDate();
        const showOccasionSubtext = occasionRecurring && data.recurringDeliveryMonthDay === occasionRecurring.date;
        const getDefaultRecurringDate = () => {
          if (occasionRecurring) return occasionRecurring.date;
          // Fall back to delivery date month/day
          if (data.arriveByDate && !data.arriveByDate.startsWith("partial")) {
            const parts = data.arriveByDate.split("-");
            if (parts.length === 3) return `${parts[1]}/${parts[2]}`;
          }
          return "";
        };
        const formatRecurringDate = (val: string) => {
          if (!val) return "";
          const parts = val.split("/");
          if (parts.length === 2) {
            const m = parseInt(parts[0], 10);
            const d = parseInt(parts[1], 10);
            if (m >= 1 && m <= 12 && d >= 1) return `${MONTH_NAMES[m - 1]} ${d}`;
          }
          return val;
        };
        // For open-ended occasions: compute next delivery date based on frequency
        const getNextDeliveryDate = (frequency: string): string => {
          if (!data.arriveByDate || data.arriveByDate.startsWith("partial")) return "";
          const base = new Date(data.arriveByDate + "T00:00:00");
          switch (frequency) {
            case "weekly":
              base.setDate(base.getDate() + 7);
              break;
            case "every_2_weeks":
              base.setDate(base.getDate() + 14);
              break;
            case "monthly":
              base.setMonth(base.getMonth() + 1);
              break;
            case "annually":
              base.setFullYear(base.getFullYear() + 1);
              break;
            default:
              return "";
          }
          return base.toISOString().split("T")[0];
        };
        const formatFullDate = (val: string) => {
          if (!val) return "";
          const d = new Date(val + "T00:00:00");
          return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
        };
        const FREQUENCY_OPTIONS: Array<{ id: typeof data.recurringFrequency; label: string }> = [
          { id: "weekly", label: "Weekly" },
          { id: "every_2_weeks", label: "Every 2 weeks" },
          { id: "monthly", label: "Monthly" },
          { id: "annually", label: "Annually" },
        ];
        const recurringTitle = isOpenEndedOccasion
          ? `Would you like us to keep sending gifts to ${displayName}?`
          : `Would you like us to handle ${displayName}\u2019s ${toDisplayOccasion(data)} gift every year?`;
        return (
          <StepLayout
            title={recurringTitle}
            subtitle="We'll remember the date, choose the gift, and send it on time."
            plain
            className="mx-auto max-w-[480px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-14 space-y-3"
          >
            <div className="mx-auto max-w-[320px] space-y-3">
              <OptionCard
                active={data.recurringEnabled === "yes"}
                onClick={() => {
                  const updates: Partial<ChildFlowData> = { recurringEnabled: "yes" };
                  if (!isOpenEndedOccasion && !data.recurringDeliveryMonthDay) {
                    updates.recurringDeliveryMonthDay = getDefaultRecurringDate();
                  }
                  update(updates);
                }}
                className="!rounded-full !py-3.5 !text-center"
              >
                <div className="text-center">
                  <span className="text-[18px] font-bold text-[#0f1b3a]">Yes</span>
                  <p className="mt-1 text-[15px] text-slate-500">
                    {isOpenEndedOccasion ? "Set up recurring gift deliveries" : "Automatically send a gift each year"}
                  </p>
                </div>
              </OptionCard>

              {data.recurringEnabled === "yes" && !isOpenEndedOccasion && (
                <div className="flex items-center justify-between gap-3">
                  <div className="shrink-0">
                    <span className="whitespace-nowrap text-[15px] font-medium text-[#1a2748]">Recurring delivery date:</span>
                    {showOccasionSubtext && occasionRecurring && (
                      <p className="text-[12px] text-slate-400 mt-0.5">{occasionRecurring.subtext}</p>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        const picker = document.getElementById("recurring-date-picker") as HTMLInputElement;
                        if (picker) picker.showPicker();
                      }}
                      className="flex items-center gap-2 whitespace-nowrap rounded-[12px] border border-[#2aa89c] bg-white px-6 py-2 text-[14px] font-medium text-[#101b3d] hover:bg-slate-50 transition cursor-pointer"
                    >
                      <span>{formatRecurringDate(data.recurringDeliveryMonthDay) || "Select date"}</span>
                      <Calendar className="h-4 w-4 text-slate-400" />
                    </button>
                    <input
                      id="recurring-date-picker"
                      type="date"
                      value={(() => {
                        const parts = data.recurringDeliveryMonthDay.split("/");
                        if (parts.length === 2) return `2026-${parts[0]}-${parts[1]}`;
                        return "";
                      })()}
                      onChange={(e) => {
                        if (e.target.value) {
                          const parts = e.target.value.split("-");
                          update({ recurringDeliveryMonthDay: `${parts[1]}/${parts[2]}` });
                        }
                      }}
                      className="invisible absolute left-0 top-0 h-0 w-0"
                    />
                  </div>
                </div>
              )}

              {data.recurringEnabled === "yes" && isOpenEndedOccasion && (
                <div className="mt-4 space-y-3">
                  <p className="text-[15px] font-medium text-[#1a2748]">How often?</p>
                  <div className="space-y-2">
                    {FREQUENCY_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-[#2aa89c]"
                        style={data.recurringFrequency === opt.id ? { borderColor: "#2aa89c", backgroundColor: "#f0fdf9" } : {}}
                      >
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition"
                          style={data.recurringFrequency === opt.id ? { borderColor: "#2aa89c" } : { borderColor: "#cbd5e1" }}
                        >
                          {data.recurringFrequency === opt.id && (
                            <span className="block h-2.5 w-2.5 rounded-full bg-[#2aa89c]" />
                          )}
                        </span>
                        <span className="text-[15px] font-medium text-[#0f1b3a]">{opt.label}</span>
                        <input
                          type="radio"
                          name="recurringFrequency"
                          value={opt.id}
                          checked={data.recurringFrequency === opt.id}
                          onChange={() => {
                            const nextDate = getNextDeliveryDate(opt.id);
                            update({
                              recurringFrequency: opt.id,
                              recurringDeliveryMonthDay: nextDate,
                            });
                          }}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>

                  {data.recurringFrequency && (
                    <div className="flex items-center justify-between gap-3 mt-4">
                      <span className="whitespace-nowrap text-[15px] font-medium text-[#1a2748]">Next delivery date:</span>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            const picker = document.getElementById("recurring-date-picker") as HTMLInputElement;
                            if (picker) picker.showPicker();
                          }}
                          className="flex items-center gap-2 whitespace-nowrap rounded-[12px] border border-[#2aa89c] bg-white px-6 py-2 text-[14px] font-medium text-[#101b3d] hover:bg-slate-50 transition cursor-pointer"
                        >
                          <span>{formatFullDate(data.recurringDeliveryMonthDay) || "Select date"}</span>
                          <Calendar className="h-4 w-4 text-slate-400" />
                        </button>
                        <input
                          id="recurring-date-picker"
                          type="date"
                          value={data.recurringDeliveryMonthDay}
                          min={getMinDeliveryDate()}
                          onChange={(e) => {
                            if (e.target.value) {
                              update({ recurringDeliveryMonthDay: e.target.value });
                            }
                          }}
                          className="invisible absolute left-0 top-0 h-0 w-0"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <OptionCard
                active={data.recurringEnabled === "no"}
                onClick={() => update({ recurringEnabled: "no" })}
                className="!rounded-full !py-3.5 !text-center !mt-8"
              >
                <div className="text-center">
                  <span className="text-[18px] font-bold text-[#0f1b3a]">No</span>
                  <p className="mt-1 text-[15px] text-slate-500">I&apos;ll remember and manage it myself</p>
                </div>
              </OptionCard>
            </div>

            {error && stepId === "recurring" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <PrimaryButton onClick={goNext} disabled={!validateStep("recurring", data)}>
              Continue
            </PrimaryButton>
          </StepLayout>
        );
      }

      // ── Frame 21: Checkout ──────────────────────────────────────────
      case "checkout":
        return (
          <StepLayout
            title="Complete your order"
            plain
            className="mx-auto max-w-[520px] px-2 pt-2 sm:pt-4"
            titleClassName="text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]"
            contentClassName="mt-6 space-y-5"
          >
            {/* Cost breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-[#f8f9fc] p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Order Summary</h3>
              <div className="mt-2 space-y-1 text-[15px] text-[#17244a]">
                <p>{displayName}&apos;s {toDisplayOccasion(data)} gift</p>
                <p className="font-semibold">
                  {BUDGET_OPTIONS.find((b) => b.id === data.budget)?.label ?? ""}
                  {data.budget === "above_250" ? ` ($${data.customBudget})` : ""}
                </p>
                <p>Est. delivery: {getEstimatedDeliveryDate(data)}</p>
              </div>
            </div>

            {/* Payment placeholder */}
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-lg font-semibold text-slate-500">Payment form placeholder</p>
              <p className="mt-1 text-sm text-slate-400">Real payment integration coming soon</p>
            </div>

            {/* Shipping address */}
            <h3 className="text-lg font-bold text-[#12214a]">Shipping</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Recipient first name:">
                <Input value={data.firstName} onChange={(e) => update({ firstName: e.target.value })} />
              </Field>
              <Field label="Recipient last name*">
                <Input value={data.recipientLastName} onChange={(e) => update({ recipientLastName: e.target.value })} />
              </Field>
            </div>
            <Field label="Street address*">
              <Input value={data.street} onChange={(e) => update({ street: e.target.value })} />
            </Field>
            <Field label="Address line 2 (optional)">
              <Input value={data.apt} onChange={(e) => update({ apt: e.target.value })} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City*">
                <Input value={data.city} onChange={(e) => update({ city: e.target.value })} />
              </Field>
              <Field label="State*">
                <Input value={data.state} onChange={(e) => update({ state: e.target.value })} />
              </Field>
              <Field label="ZIP*">
                <Input value={data.zip} onChange={(e) => update({ zip: e.target.value })} />
              </Field>
            </div>
            {error && stepId === "checkout" && (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            )}
            <PrimaryButton
              onClick={submitOrder}
              disabled={!validateStep("checkout", data) || submitting}
            >
              {submitting ? "Submitting..." : "Confirm Order"}
            </PrimaryButton>
            {submitted && (
              <p className="text-center text-sm font-medium text-emerald-600">
                Order submitted successfully! 🎉
              </p>
            )}
          </StepLayout>
        );

      default:
        return null;
    }
  }

  return (
    <main className="h-dvh overflow-hidden bg-[#f3f4f6]">
      <div className="mx-auto w-full max-w-3xl">
        {/* Progress bar — hide on animation frames */}
        {stepId && !isAnimationFrame(stepId) && (
          <ProgressHeader
            current={progressCurrent}
            total={progressTotal}
            onBack={goBack}
          />
        )}
        {/* Spacer when progress bar is hidden (animation frames) */}
        {stepId && isAnimationFrame(stepId) && <div className="h-[72px]" />}

        {/* Vertical scrolling flow */}
        <FlowViewport currentIdx={currentIdx} stepCount={visibleSteps.length}>
          {(vpHeight) =>
            visibleSteps.map((sid, idx) => (
              <FlowStep
                key={sid}
                ref={(el) => { stepRefs.current[idx] = el; }}
                active={idx === currentIdx}
                viewportHeight={vpHeight}
              >
                {renderStep(sid, idx === currentIdx)}
              </FlowStep>
            ))
          }
        </FlowViewport>
      </div>
    </main>
  );
}
