import { render, screen } from "@testing-library/react";
import BalanceSection from "./balanceSection";

jest.mock("../../hooks/useTransactions", () => ({
  useTransactions: jest.fn(),
}));

jest.mock("./totalBalance", () => (props: any) => (
  <div data-testid="total-balance">Total: {props.total}</div>
));
jest.mock("./incomeExpensesSummary", () => (props: any) => (
  <div data-testid="income-expenses-summary">
    Income: {props.income}, Expenses: {props.expenses}
  </div>
));

describe("BalanceSection component", () => {
  const { useTransactions } = require("../../hooks/useTransactions");

  it("renders total balance and income/expenses summary correctly", () => {
    (useTransactions as jest.Mock).mockReturnValue({
      totalBalance: 1000,
      totalIncome: 1500,
      totalExpenses: 500,
    });

    render(<BalanceSection />);

    expect(screen.getByTestId("total-balance")).toHaveTextContent("Total: 1000");
    expect(screen.getByTestId("income-expenses-summary")).toHaveTextContent(
      "Income: 1500, Expenses: 500"
    );
  });
});
