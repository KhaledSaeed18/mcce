import {
  TUITION_AVERAGE_CREDITS_PER_YEAR,
  TUITION_LBP_PER_CREDIT,
  TUITION_NUMBER_OF_YEARS,
  TUITION_TOTAL_LBP_PER_YEAR,
  TUITION_TOTAL_USD_PER_YEAR,
  TUITION_USD_PER_CREDIT,
} from "@/config/tuition";
import { formatLbp, formatUsd } from "@/lib/tuition/calc";

export interface TuitionReferenceFact {
  label: string;
  value: string;
}

/** One list behind both layouts, so the table and the stacked card cannot drift apart. */
export const TUITION_REFERENCE_FACTS: TuitionReferenceFact[] = [
  {
    label: "Average credits/year",
    value: String(TUITION_AVERAGE_CREDITS_PER_YEAR),
  },
  { label: "No. of years", value: String(TUITION_NUMBER_OF_YEARS) },
  { label: "USD per credit", value: formatUsd(TUITION_USD_PER_CREDIT) },
  { label: "Total USD/year", value: formatUsd(TUITION_TOTAL_USD_PER_YEAR) },
  { label: "LBP per credit", value: formatLbp(TUITION_LBP_PER_CREDIT) },
  { label: "Total LBP/year", value: formatLbp(TUITION_TOTAL_LBP_PER_YEAR) },
];
