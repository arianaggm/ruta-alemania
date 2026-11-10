export type RentType = "warm" | "cold";

export const monthlyFields = [
  "rent", "utilities", "groceries", "insurance", "leisure", "phone", "transport", "otherMonthly", "semesterContribution",
] as const;

export const arrivalFields = [
  "deposit", "flight", "visa", "documents", "applications", "winterClothing", "homeEssentials", "otherArrival",
] as const;

export type MoneyField = (typeof monthlyFields)[number] | (typeof arrivalFields)[number];
export type BudgetValues = { rentType: RentType } & Record<MoneyField, number>;
export type BudgetPreset = "general" | "dresden";

export const budgetPresets: Record<BudgetPreset, BudgetValues> = {
  general: {
    rentType: "warm", rent: 639, utilities: 0, groceries: 269, insurance: 148, leisure: 226,
    phone: 24, transport: 0, otherMonthly: 0, semesterContribution: 300,
    deposit: 0, flight: 0, visa: 0, documents: 0, applications: 0,
    winterClothing: 0, homeEssentials: 0, otherArrival: 0,
  },
  dresden: {
    rentType: "warm", rent: 450, utilities: 0, groceries: 200, insurance: 148.5, leisure: 150,
    phone: 15, transport: 0, otherMonthly: 0, semesterContribution: 361,
    deposit: 0, flight: 0, visa: 0, documents: 0, applications: 0,
    winterClothing: 0, homeEssentials: 0, otherArrival: 0,
  },
};

export function parseEuroInput(input: string): number | null {
  const value = input.trim();
  if (value === "") return 0;
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(value)) return null;
  const amount = Number(value.replace(",", "."));
  return Number.isFinite(amount) ? amount : null;
}

function roundEuros(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateBudget(values: BudgetValues) {
  const activeFields = [...monthlyFields.filter((field) => field !== "utilities" || values.rentType === "cold"), ...arrivalFields];
  if ((values.rentType !== "warm" && values.rentType !== "cold") || activeFields.some((field) => !Number.isFinite(values[field]) || values[field] < 0)) {
    throw new RangeError("Los importes deben ser números válidos mayores o iguales a cero.");
  }

  const monthlyUtilities = values.rentType === "cold" ? values.utilities : 0;
  const semesterMonthly = values.semesterContribution / 6;
  const monthlyWithoutLeisure = values.rent + monthlyUtilities + values.groceries + values.insurance + values.phone + values.transport + values.otherMonthly + semesterMonthly;
  const monthlyRecurring = monthlyWithoutLeisure + values.leisure;
  const arrivalTotal = arrivalFields.reduce((total, field) => total + values[field], 0);

  return {
    semesterMonthly: roundEuros(semesterMonthly),
    monthlyWithoutLeisure: roundEuros(monthlyWithoutLeisure),
    monthlyRecurring: roundEuros(monthlyRecurring),
    yearlyRecurring: roundEuros(monthlyRecurring * 12),
    arrivalTotal: roundEuros(arrivalTotal),
    firstYearTotal: roundEuros(monthlyRecurring * 12 + arrivalTotal),
  };
}
