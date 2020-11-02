export interface DailyCasesData {
  [canton: string]: {
    [date: string]: number | null;
  };
}
