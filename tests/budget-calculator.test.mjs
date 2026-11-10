import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../app/guias/[slug]/_lib/budget.ts", import.meta.url), "utf8");
const javascript = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { budgetPresets, calculateBudget, parseEuroInput } = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`);

test("general example includes six-month semester proration and annual costs", () => {
  const totals = calculateBudget(budgetPresets.general);
  assert.equal(totals.semesterMonthly, 50);
  assert.equal(totals.monthlyRecurring, 1356);
  assert.equal(totals.yearlyRecurring, 16272);
  assert.equal(totals.arrivalTotal, 0);
  assert.equal(totals.firstYearTotal, 16272);
});

test("Dresden example is personal high-spending month, not a statistical average", () => {
  const totals = calculateBudget(budgetPresets.dresden);
  assert.equal(totals.semesterMonthly, 60.17);
  assert.equal(totals.monthlyWithoutLeisure, 873.67);
  assert.equal(totals.monthlyRecurring, 1023.67);
  assert.equal(totals.yearlyRecurring, 12284);
  assert.equal(totals.firstYearTotal, 12284);
  assert.equal(budgetPresets.dresden.utilities, 0);
  assert.equal(budgetPresets.dresden.transport, 0);
});

test("Warmmiete ignores separate utilities; Kaltmiete includes them exactly once", () => {
  const warm = { ...budgetPresets.general, utilities: 120 };
  assert.equal(calculateBudget(warm).monthlyRecurring, 1356);
  assert.equal(calculateBudget({ ...warm, rentType: "cold" }).monthlyRecurring, 1476);
  assert.equal(calculateBudget({ ...warm, rentType: "cold" }).yearlyRecurring, 17712);
});

test("arrival costs are one-time, not added to monthly recurring costs", () => {
  const values = { ...budgetPresets.general, deposit: 1000, flight: 500, visa: 75, documents: 100,
    applications: 50, winterClothing: 200, homeEssentials: 125, otherArrival: 25 };
  const totals = calculateBudget(values);
  assert.equal(totals.monthlyRecurring, 1356);
  assert.equal(totals.yearlyRecurring, 16272);
  assert.equal(totals.arrivalTotal, 2075);
  assert.equal(totals.firstYearTotal, 18347);
});

test("zero inputs work and invalid or negative amounts never silently become costs", () => {
  const zero = Object.fromEntries(Object.keys(budgetPresets.general).map((key) => [key, key === "rentType" ? "warm" : 0]));
  assert.equal(calculateBudget(zero).firstYearTotal, 0);
  assert.equal(parseEuroInput(""), 0);
  assert.equal(parseEuroInput("148,50"), 148.5);
  for (const input of ["-1", "abc", "1,234", "Infinity", "1e6"]) assert.equal(parseEuroInput(input), null);
  for (const amount of [-1, NaN, Infinity]) {
    assert.throws(() => calculateBudget({ ...zero, rent: amount }), RangeError);
  }
});
