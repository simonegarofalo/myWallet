import { render, screen, fireEvent } from "@testing-library/react";
import TransactionsList from "./transactionsList";

jest.mock("../../hooks/useTheme", () => ({
  useTheme: jest.fn(),
}));

jest.mock("../../hooks/useTransactions", () => ({
  useTransactions: jest.fn(),
}));

jest.mock("../../hooks/useLang", () => ({
  useLang: () => ({
    switchLang: jest.fn(),
    isReady: true,
  }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => key,
    i18n: { language: "en" },
  }),
}));

jest.mock("next/image", () => (props: any) => (
  <img {...props} alt={props.alt} />
));

describe("TransactionsList component", () => {
  const removeTransactionMock = jest.fn();

  const useTransactionsMock =
    require("../../hooks/useTransactions").useTransactions;
  const useThemeMock = require("../../hooks/useTheme").useTheme;

  beforeEach(() => {
    jest.clearAllMocks();
    useThemeMock.mockReturnValue({ theme: "light" });
  });

  it("renders title and arrow icon", () => {
    useTransactionsMock.mockReturnValue({
      transactions: [],
      removeTransaction: removeTransactionMock,
    });
    render(<TransactionsList />);
    expect(screen.getByText("table.showRecent")).toBeInTheDocument();
    expect(screen.getByAltText("arrow-toggle")).toBeInTheDocument();
  });

  it("toggles transactions list visibility on click", () => {
    useTransactionsMock.mockReturnValue({
      transactions: [],
      removeTransaction: removeTransactionMock,
    });
    render(<TransactionsList />);
    const header = screen.getByText("table.showRecent");
    expect(screen.queryByText("table.noTransactions")).not.toBeInTheDocument();
    fireEvent.click(header);
    expect(screen.getByText("table.noTransactions")).toBeInTheDocument();
    fireEvent.click(header);
    expect(screen.queryByText("table.noTransactions")).not.toBeInTheDocument();
  });

  it("renders transactions correctly", () => {
    const transactions = [
      {
        id: "1",
        type: "income",
        category: "salary",
        amount: 100,
        date: "2025-10-01",
      },
      {
        id: "2",
        type: "expenses",
        category: "food",
        amount: 50,
        date: "2025-10-02",
      },
    ];
    useTransactionsMock.mockReturnValue({
      transactions,
      removeTransaction: removeTransactionMock,
    });

    render(<TransactionsList />);
    fireEvent.click(screen.getByText("table.showRecent"));

    expect(
      screen.getByText("forms.incomeCategories.salary")
    ).toBeInTheDocument();
    expect(
      screen.getByText("forms.expensesCategories.food")
    ).toBeInTheDocument();
    expect(screen.getByText("100.00 €")).toBeInTheDocument();
    expect(screen.getByText("50.00 €")).toBeInTheDocument();
  });

  it("opens and confirms delete modal", () => {
    const transactions = [
      {
        id: "1",
        type: "income",
        category: "salary",
        amount: 100,
        date: "2025-10-01",
      },
    ];
    useTransactionsMock.mockReturnValue({
      transactions,
      removeTransaction: removeTransactionMock,
    });

    render(<TransactionsList />);
    fireEvent.click(screen.getByText("table.showRecent"));

    const deleteBtn = screen.getByLabelText("alerts.deleteTransaction");
    fireEvent.click(deleteBtn);

    expect(screen.getByText("alerts.deleteTransaction")).toBeInTheDocument();

    const confirmBtn = screen.getByText("alerts.confirm");
    fireEvent.click(confirmBtn);

    expect(removeTransactionMock).toHaveBeenCalledWith("1");
    expect(
      screen.queryByText("alerts.deleteTransaction")
    ).not.toBeInTheDocument();
  });

  it("cancels delete modal", () => {
    const transactions = [
      {
        id: "1",
        type: "income",
        category: "salary",
        amount: 100,
        date: "2025-10-01",
      },
    ];
    useTransactionsMock.mockReturnValue({
      transactions,
      removeTransaction: removeTransactionMock,
    });

    render(<TransactionsList />);
    fireEvent.click(screen.getByText("table.showRecent"));

    const deleteBtn = screen.getByLabelText("alerts.deleteTransaction");
    fireEvent.click(deleteBtn);

    const cancelBtn = screen.getByText("alerts.cancel");
    fireEvent.click(cancelBtn);

    expect(removeTransactionMock).not.toHaveBeenCalled();
    expect(
      screen.queryByText("alerts.deleteTransaction")
    ).not.toBeInTheDocument();
  });
});
