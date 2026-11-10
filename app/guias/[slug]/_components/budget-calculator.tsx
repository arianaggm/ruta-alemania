"use client";

import { useState } from "react";
import {
  arrivalFields, budgetPresets, calculateBudget, monthlyFields, parseEuroInput,
  type BudgetPreset, type BudgetValues, type MoneyField, type RentType,
} from "../_lib/budget";

type BudgetDraft = { rentType: RentType } & Record<MoneyField, string>;
const allFields = [...monthlyFields, ...arrivalFields];

const monthlyInputs: { field: MoneyField; label: string; hint?: string }[] = [
  { field: "groceries", label: "Supermercado" },
  { field: "insurance", label: "Seguro médico" },
  { field: "leisure", label: "Ocio" },
  { field: "phone", label: "Teléfono e internet" },
  { field: "transport", label: "Transporte adicional", hint: "No sumes aquí un boleto ya incluido en la contribución semestral." },
  { field: "otherMonthly", label: "Otros gastos mensuales" },
  { field: "semesterContribution", label: "Contribución semestral", hint: "Se divide entre seis para el total mensual." },
];

const arrivalInputs: { field: MoneyField; label: string }[] = [
  { field: "deposit", label: "Depósito de vivienda" },
  { field: "flight", label: "Vuelo" },
  { field: "visa", label: "Visa" },
  { field: "documents", label: "Traducciones certificadas y apostillas" },
  { field: "applications", label: "Solicitudes universitarias" },
  { field: "winterClothing", label: "Ropa de invierno" },
  { field: "homeEssentials", label: "Artículos básicos para el hogar" },
  { field: "otherArrival", label: "Otros gastos de llegada" },
];

function toDraft(values: BudgetValues): BudgetDraft {
  return {
    rentType: values.rentType,
    ...Object.fromEntries(allFields.map((field) => [field, String(values[field])])),
  } as BudgetDraft;
}

function euros(value: number): string {
  return `${new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)} €`;
}

function MoneyInput({ field, label, hint, value, onChange, invalid }: {
  field: MoneyField;
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
}) {
  const id = `budget-${field}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-dark-text">{label}</label>
      <div className="mt-2 flex overflow-hidden rounded-2xl border border-dark-text/20 bg-white focus-within:border-rosa-mexicano">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={hint || invalid ? `${id}-help` : undefined}
          className="min-w-0 w-full px-4 py-3 text-dark-text outline-none"
        />
        <span aria-hidden="true" className="px-4 py-3 text-dark-text/70">€</span>
      </div>
      {invalid ? <p id={`${id}-help`} className="mt-1 text-sm font-medium text-rosa-mexicano">Escribe un importe válido, sin signo y con máximo dos decimales.</p>
        : hint ? <p id={`${id}-help`} className="mt-1 text-sm leading-5 text-dark-text/70">{hint}</p> : null}
    </div>
  );
}

export function BudgetCalculator() {
  const [draft, setDraft] = useState<BudgetDraft>(() => toDraft(budgetPresets.general));
  const [selectedPreset, setSelectedPreset] = useState<BudgetPreset | "custom">("general");

  const invalidFields: MoneyField[] = [];
  const amounts = {} as Record<MoneyField, number>;
  for (const field of allFields) {
    const parsed = parseEuroInput(draft[field]);
    if (parsed === null && !(field === "utilities" && draft.rentType === "warm")) invalidFields.push(field);
    amounts[field] = parsed ?? 0;
  }
  const totals = invalidFields.length ? null : calculateBudget({ ...amounts, rentType: draft.rentType });

  function updateField(field: MoneyField, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setSelectedPreset("custom");
  }

  function applyPreset(preset: BudgetPreset) {
    setDraft((current) => {
      const next = toDraft(budgetPresets[preset]);
      for (const field of arrivalFields) next[field] = current[field];
      return next;
    });
    setSelectedPreset(preset);
  }

  return (
    <section aria-labelledby="budget-calculator-heading" className="rounded-[2rem] border border-dark-text/8 bg-white/82 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:p-8">
      <h2 id="budget-calculator-heading" className="font-display text-3xl font-semibold text-dark-text">Calcula tu presupuesto</h2>
      <p className="mt-3 leading-7 text-dark-text/78">Ajusta los importes a tu situación. Son estimaciones para organizarte, no costos oficiales ni requisitos de visa. Tus cambios no se guardan.</p>

      <div className="mt-6 flex flex-wrap gap-3" role="group" aria-label="Ejemplos de presupuesto">
        <button type="button" aria-pressed={selectedPreset === "general"} onClick={() => applyPreset("general")} className={`rounded-full border px-4 py-2.5 text-sm font-semibold ${selectedPreset === "general" ? "border-rosa-mexicano bg-rosa-mexicano text-white" : "border-dark-text/20 bg-antique-white text-dark-text hover:bg-peach-fuzz"}`}>Ejemplo general</button>
        <button type="button" aria-pressed={selectedPreset === "dresden"} onClick={() => applyPreset("dresden")} className={`rounded-full border px-4 py-2.5 text-sm font-semibold ${selectedPreset === "dresden" ? "border-rosa-mexicano bg-rosa-mexicano text-white" : "border-dark-text/20 bg-antique-white text-dark-text hover:bg-peach-fuzz"}`}>Mi presupuesto en Dresden</button>
      </div>
      <p className="mt-3 text-sm leading-6 text-dark-text/70">El ejemplo general es ilustrativo. El de Dresden refleja mis gastos personales: WG Warmmiete, compras principalmente en REWE, Lidl Connect y boleto semestral incluido. Los 150 € de ocio son el máximo de mis meses de mayor gasto, no mi promedio. Cambiar de ejemplo conserva tus gastos de llegada.</p>

      <fieldset className="mt-8">
        <legend className="font-display text-2xl font-semibold text-dark-text">Gastos mensuales</legend>
        <p className="mt-2 leading-7 text-dark-text/75"><strong>Warmmiete</strong>: la renta ya incluye calefacción y otros servicios acordados. <strong>Kaltmiete</strong>: anota aparte los servicios que pagarás. Revisa tu contrato para saber qué incluye.</p>
        <div className="mt-4 flex flex-wrap gap-4" role="radiogroup" aria-label="Tipo de renta">
          <label className="flex items-center gap-2 font-medium text-dark-text"><input type="radio" name="rent-type" checked={draft.rentType === "warm"} onChange={() => { setDraft((current) => ({ ...current, rentType: "warm" })); setSelectedPreset("custom"); }} className="accent-rosa-mexicano" />Warmmiete</label>
          <label className="flex items-center gap-2 font-medium text-dark-text"><input type="radio" name="rent-type" checked={draft.rentType === "cold"} onChange={() => { setDraft((current) => ({ ...current, rentType: "cold" })); setSelectedPreset("custom"); }} className="accent-rosa-mexicano" />Kaltmiete</label>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <MoneyInput field="rent" label="Renta mensual" value={draft.rent} onChange={(value) => updateField("rent", value)} invalid={invalidFields.includes("rent")} />
          {draft.rentType === "cold" ? <MoneyInput field="utilities" label="Servicios adicionales" hint="Por ejemplo, calefacción, agua o electricidad solo si no están incluidos en tu renta." value={draft.utilities} onChange={(value) => updateField("utilities", value)} invalid={invalidFields.includes("utilities")} /> : null}
          {monthlyInputs.map(({ field, label, hint }) => <MoneyInput key={field} field={field} label={label} hint={hint} value={draft[field]} onChange={(value) => updateField(field, value)} invalid={invalidFields.includes(field)} />)}
        </div>
        {draft.rentType === "warm" ? <p className="mt-4 text-sm leading-6 text-dark-text/70">Con Warmmiete, los servicios no se suman aparte, aunque hayas anotado un importe antes de cambiar el tipo de renta.</p> : null}
      </fieldset>

      <fieldset className="mt-9 border-t border-dark-text/10 pt-8">
        <legend className="font-display text-2xl font-semibold text-dark-text">Gastos únicos de llegada</legend>
        <p className="mt-2 leading-7 text-dark-text/75">Deja en blanco lo que aún no sepas. Estos importes se suman una sola vez al primer año; no se agregan al gasto mensual.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {arrivalInputs.map(({ field, label }) => <MoneyInput key={field} field={field} label={label} value={draft[field]} onChange={(value) => updateField(field, value)} invalid={invalidFields.includes(field)} />)}
        </div>
      </fieldset>

      {totals ? (
        <div className="mt-9 rounded-3xl bg-butter/45 p-5 sm:p-7" aria-label="Resumen del presupuesto">
          <h3 className="font-display text-2xl font-semibold text-dark-text">Tu estimación</h3>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Gastos mensuales recurrentes", totals.monthlyRecurring],
              ["Gastos recurrentes del año", totals.yearlyRecurring],
              ["Gastos únicos de llegada", totals.arrivalTotal],
              ["Total estimado del primer año", totals.firstYearTotal],
            ].map(([label, value]) => <div key={label} className="rounded-2xl bg-white/80 p-4"><dt className="text-sm font-medium text-dark-text/75">{label}</dt><dd className="mt-1 text-2xl font-semibold text-dark-text">{euros(Number(value))}</dd></div>)}
          </dl>
          <p className="mt-5 leading-7 text-dark-text/80">La contribución semestral equivale a {euros(totals.semesterMonthly)} al mes. Sin ocio, el total mensual es {euros(totals.monthlyWithoutLeisure)}. El cálculo anual incluye dos contribuciones semestrales; no vuelve a sumar los servicios incluidos en Warmmiete ni un boleto ya cubierto por esa cuota.</p>
          <p className="mt-3 text-sm leading-6 text-dark-text/75">La cifra anual proyecta los importes mensuales ingresados durante 12 meses. En el ejemplo de Dresden, repetir el máximo de ocio cada mes no representa mis gastos anuales reales.</p>
        </div>
      ) : <p role="alert" className="mt-8 rounded-2xl bg-peach-fuzz p-4 font-medium text-dark-text">Corrige los importes marcados para ver tus totales.</p>}

      <p className="mt-6 text-sm leading-6 text-dark-text/75">Los fondos de una cuenta bloqueada son una prueba de financiamiento, no un gasto adicional que debas sumar encima de los costos de vida ya incluidos aquí. Verifica los requisitos vigentes en fuentes oficiales.</p>
    </section>
  );
}
