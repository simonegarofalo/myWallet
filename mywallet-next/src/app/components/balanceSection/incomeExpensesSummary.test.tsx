import { render, screen } from "@testing-library/react";
import IncomeExpensesSummary from "./incomeExpensesSummary";

jest.mock("../../hooks/useLang", () => ({
  useLang: () => ({
    switchLang: jest.fn(),
    isReady: true,
  }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("IncomeExpensesSummary component", () => {
  it("renders zero values correctly", () => {
    render(<IncomeExpensesSummary income={0} expenses={0} />);

    const values = screen.getAllByText(
      (content) => content.includes("0.00") && content.includes("€")
    );
    expect(values.length).toBe(2);
  });

  it("renders positive values correctly", () => {
    render(<IncomeExpensesSummary income={123.45} expenses={67.89} />);

    const values = screen.getAllByText((content) => content.includes("€"));
    expect(values.some((el) => el.textContent?.includes("123.45"))).toBe(true);
    expect(values.some((el) => el.textContent?.includes("67.89"))).toBe(true);
  });
});
