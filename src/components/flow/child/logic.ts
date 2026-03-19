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
  return /\S+@\S+\.\S+/.test(value);
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
 * Get the minimum selectable date (7 business days from today).
 * Returns an ISO date string (YYYY-MM-DD).
 */
export function getMinDeliveryDate(): string {
  const date = new Date();
  let businessDays = 0;
  while (businessDays < 7) {
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
  return STEP_ORDER.filter((step) => {
    // birthdayDate only visible when occasion is Birthday
    if (step === "birthdayDate") {
      return data.occasion === "Birthday";
    }
    // anniversaryDate only visible when occasion is Anniversary
    if (step === "anniversaryDate") {
      return data.occasion === "Anniversary";
    }
    // recurring skipped for one-time occasions
    if (step === "recurring") {
      const oneTimeOccasions = ["Baby Shower / Newborn", "Wedding", "Graduation", "Housewarming", "Just Because", "Other"];
      if (oneTimeOccasions.includes(data.occasion)) return false;
    }
    // ageRange skipped when birthday is fully provided (we can derive age) or unborn child
    if (step === "ageRange") {
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
      return data.recipientType === "child"; // only child path supported

    case "recipientName":
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

    case "giftStyle":
      return data.giftStyle.length > 0;

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
      return data.arriveByDate.length > 0 && !data.arriveByDate.startsWith("partial");

    case "giftMessage":
      return data.giftSignature.trim().length > 0;

    case "giftWrapped":
      return data.giftWrapped !== "";

    case "review":
      return true;

    case "recurring":
      return data.recurringEnabled !== "";

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
