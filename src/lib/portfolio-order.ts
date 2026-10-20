export type DatedPortfolioEntry = {
  year?: number | string;
  period?: string;
  active?: boolean;
};

function entryYear(entry: DatedPortfolioEntry, currentYear: number): number {
  const dateText = `${entry.year ?? ""} ${entry.period ?? ""}`;
  if (/\b(present|current|ongoing)\b/i.test(dateText)) return currentYear;

  const years = dateText.match(/\b(?:19|20)\d{2}\b/g)?.map(Number) ?? [];
  const explicitYear = typeof entry.year === "number" ? entry.year : Number(entry.year);
  if (Number.isFinite(explicitYear) && explicitYear > 0) years.push(explicitYear);

  return years.length ? Math.max(...years) : 0;
}

export function sortNewestFirst<T extends DatedPortfolioEntry>(entries: readonly T[], currentYear = new Date().getFullYear()): T[] {
  return entries
    .map((entry, index) => ({ entry, index, year: entry.active ? currentYear + 1 : entryYear(entry, currentYear) }))
    .sort((left, right) => right.year - left.year || left.index - right.index)
    .map(({ entry }) => entry);
}