export interface WattsonEnergySummary {
  grid_export: number;
  estimated_self_consumed_generation: number;
}

export interface WattsonFinancialAssumptions {
  average_import_rate_gbp_per_kwh: number | null;
  average_export_rate_gbp_per_kwh: number | null;
  system_cost_gbp: number | null;
}

export interface WattsonFinancials {
  avoidedImportValue: number | null;
  exportIncome: number | null;
  totalEstimatedFinancialBenefit: number | null;
  estimatedNetPositionAgainstSystemCost: number | null;
  estimatedPaybackPercentage: number | null;
}

const hasValue = (value: number | null): value is number => value !== null;

export function calculateWattsonFinancials(
  energy: WattsonEnergySummary,
  assumptions: WattsonFinancialAssumptions,
): WattsonFinancials {
  const avoidedImportValue = hasValue(
    assumptions.average_import_rate_gbp_per_kwh,
  )
    ? energy.estimated_self_consumed_generation *
      assumptions.average_import_rate_gbp_per_kwh
    : null;

  const exportIncome = hasValue(assumptions.average_export_rate_gbp_per_kwh)
    ? energy.grid_export * assumptions.average_export_rate_gbp_per_kwh
    : null;

  const totalEstimatedFinancialBenefit =
    hasValue(avoidedImportValue) && hasValue(exportIncome)
      ? avoidedImportValue + exportIncome
      : null;

  const estimatedNetPositionAgainstSystemCost =
    hasValue(totalEstimatedFinancialBenefit) &&
    hasValue(assumptions.system_cost_gbp)
      ? totalEstimatedFinancialBenefit - assumptions.system_cost_gbp
      : null;

  const estimatedPaybackPercentage =
    hasValue(totalEstimatedFinancialBenefit) &&
    hasValue(assumptions.system_cost_gbp) &&
    assumptions.system_cost_gbp > 0
      ? (totalEstimatedFinancialBenefit / assumptions.system_cost_gbp) * 100
      : null;

  return {
    avoidedImportValue,
    exportIncome,
    totalEstimatedFinancialBenefit,
    estimatedNetPositionAgainstSystemCost,
    estimatedPaybackPercentage,
  };
}
