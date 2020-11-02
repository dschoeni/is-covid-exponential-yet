import regression from "regression";
import { DailyCasesData } from "@/data/DailyCasesData";

const ExponentialService = {
  estimateExponential(
    data: DailyCasesData,
    selectedCantons: string[],
    days: number
  ): any {
    const filteredData = selectedCantons.map(canton => {
      return Object.values(data![canton + "_diff"])
        .slice(-days)
        .slice(0, days - 5);
    });

    const reducedData = Array.from(Array(days).keys())
      .map(index => {
        return filteredData.map(cantonData => cantonData[index]);
      })
      .map(x =>
        x.reduce((previous, current) => (previous || 0) + (current || 0), 0)
      );

    const indexedData = reducedData
      .map((val, index) => [index, val])
      .filter(val => val[1] !== 0 && val[1] !== undefined);

    return regression.exponential(indexedData);
  }
};

export { ExponentialService };
export default ExponentialService;
