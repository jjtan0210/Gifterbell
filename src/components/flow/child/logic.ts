import {
  ANIMATION_FRAMES,
  ChildFlowData,
  StepId,
  STEP_ORDER,
} from "./config";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalize(input: string) {
  return input.trim().toLowerCase();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function isAnimationFrame(stepId: StepId) {
  return ANIMATION_FRAMES.includes(stepId);
}

/** Check if the occasion date has all 3 parts filled in */
export function hasCompleteOccasionDate(data: ChildFlowData) {
  const { month, day, year } = data.occasionDate;
  return month.trim() !== "" && day.trim() !== "" && year.trim() !== "";
}

/**
 * Get the minimum selectable date (5 business days from today).
 * Returns an ISO date string (YYYY-MM-DD).
 */
export function getMinDeliveryDate(): string {
  const date = new Date();
  let businessDays = 0;
  while (businessDays < 5) {
    date.setDate(date.getDate() + 1);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDays++;
    }
  }
  return date.toISOString().split("T")[0];
}

// ─── Visible Steps ───────────────────────────────────────────────────────────

/** Returns only the steps that should be visible given current user selections. */
export function getVisibleSteps(data: ChildFlowData): StepId[] {
  const isAdult = data.recipientType === "adult";
  const isPet = data.recipientType === "pet";
  return STEP_ORDER.filter((step) => {
    // petType only visible for pet flow
    if (step === "petType") {
      return isPet;
    }
    // petSize only visible for pet flow
    if (step === "petSize") {
      return isPet;
    }
    // adultGiftVibe only visible for adult flow
    if (step === "adultGiftVibe") {
      return isAdult;
    }
    // interests skipped for pet flow
    if (step === "interests") {
      return !isPet;
    }
    // giftStyle skipped for pet flow (pets use petGiftStyle in the giftStyle step position — we reuse giftStyle step)
    // Actually, we reuse the giftStyle step but with pet-specific options, so keep it visible
    // birthdayDate only visible when occasion is Birthday
    if (step === "birthdayDate") {
      return data.occasion === "Birthday" && !isPet;
    }
    // anniversaryDate only visible when occasion is Anniversary
    if (step === "anniversaryDate") {
      return data.occasion === "Anniversary" && !isPet;
    }
    // recurring skipped for one-time occasions and pet flow
    if (step === "recurring") {
      if (isPet) return false;
      const oneTimeOccasions = ["Baby Shower / Newborn", "Wedding", "Graduation", "Housewarming"];
      if (oneTimeOccasions.includes(data.occasion)) return false;
    }
    // ageRange: always show for adults and pets, conditional for children
    if (step === "ageRange") {
      if (isAdult || isPet) return true;
      if (data.isUnbornChild) return false;
      if (data.occasion === "Birthday" && hasCompleteOccasionDate(data)) {
        return false;
      }
      return true;
    }
    return true;
  });
}

// ─── Validation ───────────────────────────────────────────────────────────────
export function validateStep(step: StepId, data: ChildFlowData) {
  switch (step) {
    // Animation frames are always valid (auto-advance)
    case "greeting":
    case "thanksAnim":
    case "coveredAnim":
    case "wrapUpAnim":
      return true;

    case "customerInfo":
      return data.customerFirstName.trim().length > 0 && isEmail(data.customerEmail);

    case "recipientType":
      return data.recipientType === "child" || data.recipientType === "adult" || data.recipientType === "pet";

    case "petType":
      return data.petType === "dog" || data.petType === "cat";

    case "recipientName":
      if (data.recipientType === "adult" || data.recipientType === "pet") return data.firstName.trim().length > 0;
      return data.isUnbornChild || data.firstName.trim().length > 0;

    case "occasion":
      if (!data.occasion) return false;
      return data.occasion !== "Other" || data.occasionOther.trim().length > 0;

    case "birthdayDate":
      return data.occasionDateUnsure || hasCompleteOccasionDate(data);

    case "anniversaryDate":
      return true; // always valid — user can skip

    case "ageRange":
      return data.ageRange.trim().length > 0;

    case "interests":
      if (data.interests.includes("Other specific interests")) {
        return data.interestsOther.trim().length > 0;
      }
      return true;

    case "petSize":
      return data.petSize.trim().length > 0;

    case "giftStyle":
      if (data.recipientType === "pet") return data.petGiftStyle.length > 0;
      return data.giftStyle.length > 0;

    case "adultGiftVibe":
      return data.adultGiftVibe.length > 0;

    case "avoid":
      return true; // optional

    case "budget": {
      if (!data.budget) return false;
      if (data.budget === "above_250") {
        const numeric = Number.parseFloat(data.customBudget);
        if (Number.isNaN(numeric) || numeric <= 250) return false;
      }
      return true;
    }

    case "deliveryDate":
      if (data.arriveByDate.length === 0 || data.arriveByDate.startsWith("partial")) return false;
      return data.arriveByDate >= getMinDeliveryDate();

    case "giftMessage":
      return data.giftSignature.trim().length > 0;

    case "giftWrapped":
      return data.giftWrapped !== "";

    case "review":
      return true;

    case "recurring": {
      if (data.recurringEnabled === "") return false;
      if (data.recurringEnabled === "yes") {
        const isOpenEnded = data.occasion === "Just Because" || data.occasion === "Other";
        if (isOpenEnded) {
          return data.recurringFrequency !== "" && data.recurringDeliveryMonthDay !== "";
        }
      }
      return true;
    }

    case "checkout":
      return (
        data.firstName.trim().length > 0 &&
        data.recipientLastName.trim().length > 0 &&
        data.street.trim().length > 0 &&
        data.city.trim().length > 0 &&
        data.state.trim().length > 0 &&
        data.zip.trim().length > 0
      );

    default:
      return false;
  }
}

// ─── Display Helpers ──────────────────────────────────────────────────────────
export function toDisplayOccasion(data: ChildFlowData) {
  if (data.occasion === "Other") return data.occasionOther.trim() || "Custom occasion";
  if (data.occasion === "Baby Shower / Newborn") return "Newborn";
  return data.occasion;
}

export function isSelected(value: string, target: string) {
  return normalize(value) === normalize(target);
}

export function getEstimatedDeliveryDate(data: ChildFlowData) {
  if (data.arriveByDate) {
    return new Date(data.arriveByDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
