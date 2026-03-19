// ─── Types ────────────────────────────────────────────────────────────────────
export type RecipientType = "child" | "adult" | "pet";
export type GiftStyleOption = "boy_leaning" | "girl_leaning" | "neutral" | "open";
export type GiftStyle = GiftStyleOption[];
export type BudgetOption = "25_50" | "50_100" | "100_150" | "150_250" | "above_250" | "";
export type GiftWrappedOption = "yes" | "no" | "";
export type RecurringOption = "yes" | "no" | "";

export type StepId =
  | "customerInfo"
  | "greeting"
  | "recipientType"
  | "recipientName"
  | "occasion"
  | "thanksAnim"
  | "birthdayDate"
  | "anniversaryDate"
  | "ageRange"
  | "interests"
  | "giftStyle"
  | "avoid"
  | "coveredAnim"
  | "budget"
  | "deliveryDate"
  | "giftMessage"
  | "giftWrapped"
  | "wrapUpAnim"
  | "review"
  | "recurring"
  | "checkout";

// ─── Flow Data ────────────────────────────────────────────────────────────────
export type OccasionDate = {
  month: string;
  day: string;
  year: string;
};

export type ChildFlowData = {
  // Frame 1: Customer info
  customerFirstName: string;
  customerEmail: string;
  // Frame 3: Recipient type
  recipientType: RecipientType;
  // Frame 4: Recipient name
  firstName: string;
  isUnbornChild: boolean;
  // Frame 5: Occasion
  occasion: string;
  occasionOther: string;
  // Frame 7A/7B: Occasion date
  occasionDate: OccasionDate;
  occasionDateUnsure: boolean;
  // Frame 8: Age range
  ageRange: string;
  // Frame 9: Gender descriptor
  gender: string;
  // Frame 10: Interests
  interests: string[];
  interestsOther: string;
  // Frame 11: Gift style
  giftStyle: GiftStyle;
  // Frame 12: Avoid
  avoidances: string[];
  otherAvoidance: string;
  // Frame 14: Budget
  budget: BudgetOption;
  customBudget: string;
  // Frame 15: Delivery date
  arriveByDate: string;
  // Frame 16: Gift message
  giftSignature: string;
  useCustomMessage: boolean;
  customMessage: string;
  // Frame 17: Gift wrapped
  giftWrapped: GiftWrappedOption;
  // Frame 20: Recurring
  recurringEnabled: RecurringOption;
  recurringDeliveryMonthDay: string;
  // Frame 21: Checkout / shipping address
  recipientLastName: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
};

export const INITIAL_CHILD_FLOW: ChildFlowData = {
  customerFirstName: "",
  customerEmail: "",
  recipientType: "child",
  firstName: "",
  isUnbornChild: false,
  occasion: "",
  occasionOther: "",
  occasionDate: { month: "", day: "", year: "" },
  occasionDateUnsure: false,
  ageRange: "",
  gender: "",
  interests: [],
  interestsOther: "",
  giftStyle: [],
  avoidances: [],
  otherAvoidance: "",
  budget: "",
  customBudget: "",
  arriveByDate: "",
  giftSignature: "",
  useCustomMessage: false,
  customMessage: "",
  giftWrapped: "",
  recurringEnabled: "",
  recurringDeliveryMonthDay: "",
  recipientLastName: "",
  street: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
};

// ─── Option Constants ─────────────────────────────────────────────────────────

export const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Holiday",
  "Mother's Day",
  "Father's Day",
  "Valentine's Day",
  "Baby Shower / Newborn",
  "Wedding",
  "Graduation",
  "Housewarming",
  "Just Because",
  "Other",
];

export const AGE_RANGES = [
  "Newborn: 0\u20133 months",
  "Infant: 3\u20136 months",
  "Infant: 6\u201312 months",
  "Young Toddler: 12\u201324 months",
  "Toddler: 2\u20133 years",
  "Preschooler: 4\u20135 years",
  "Younger Kid: 6\u20138 years",
  "Older Kid: 9\u201311 years",
  "Tween: 12\u201314 years",
  "Teen: 15\u201317 years",
];

export const GENDER_OPTIONS = ["Boy", "Girl", "Non-binary", "Prefer not to say"];

export const INTEREST_OPTIONS = [
  "Animals",
  "Arts & Crafts",
  "Building & Construction",
  "Cars, Trucks & Trains",
  "Dolls & Pretend Play",
  "Dress-Up & Imaginative Play",
  "Dinosaurs",
  "Books",
  "Music",
  "Puzzles",
  "Games",
  "Science & STEM",
  "Sports & Active Play",
  "Outdoor Play",
  "Video Games",
  "Cooking & Baking",
  "Nature & Gardening",
  "Space",
  "Other specific interests",
];

export const AVOIDANCE_OPTIONS = ["Messy toys", "Loud toys"];

export const BUDGET_OPTIONS: Array<{ id: Exclude<BudgetOption, "">; label: string }> = [
  { id: "25_50", label: "$25\u2013$50" },
  { id: "50_100", label: "$50\u2013$100" },
  { id: "100_150", label: "$100\u2013$150" },
  { id: "150_250", label: "$150\u2013$250" },
  { id: "above_250", label: "Above $250+" },
];

// Animation frame IDs (auto-advance, no user input)
export const ANIMATION_FRAMES: StepId[] = [
  "greeting",
  "thanksAnim",
  "coveredAnim",
  "wrapUpAnim",
];

// Full step ordering — conditional steps are filtered at runtime
export const STEP_ORDER: StepId[] = [
  "customerInfo",
  "greeting",
  "recipientType",
  "recipientName",
  "occasion",
  "thanksAnim",
  "birthdayDate",
  "anniversaryDate",
  "ageRange",
  "interests",
  "giftStyle",
  "avoid",
  "coveredAnim",
  "budget",
  "deliveryDate",
  "giftMessage",
  "giftWrapped",
  "wrapUpAnim",
  "review",
  "recurring",
  "checkout",
];
