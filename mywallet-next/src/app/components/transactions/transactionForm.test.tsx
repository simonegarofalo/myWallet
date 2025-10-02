import { render, screen, fireEvent } from "@testing-library/react";
import TransactionForm from "./transactionForm";

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

const addTransactionMock = jest.fn();
jest.mock("../../hooks/useTransactions", () => ({
  useTransactions: () => ({
    addTransaction: addTransactionMock,
  }),
}));

describe("TransactionForm component", () => {
  const onDismissMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with correct labels for expenses", () => {
    render(<TransactionForm type="expenses" onDismiss={onDismissMock} />);

    expect(
      screen.getByText("forms.formTitle forms.expensesCategory")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("forms.formLabel.dateLabel")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("forms.formLabel.categoryLabel")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("forms.formLabel.amountLabel")
    ).toBeInTheDocument();
    expect(screen.getByText("buttons.dismiss")).toBeInTheDocument();
    expect(screen.getByText("buttons.addNew")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    render(<TransactionForm type="income" onDismiss={onDismissMock} />);
    fireEvent.click(screen.getByText("buttons.dismiss"));
    expect(onDismissMock).toHaveBeenCalled();
  });

  it("calls addTransaction on form submit with correct data", () => {
    render(<TransactionForm type="expenses" onDismiss={onDismissMock} />);

    const dateInput = screen.getByLabelText("forms.formLabel.dateLabel");
    const categorySelect = screen.getByLabelText(
      "forms.formLabel.categoryLabel"
    );
    const amountInput = screen.getByLabelText("forms.formLabel.amountLabel");
    const submitButton = screen.getByText("buttons.addNew");

    fireEvent.change(dateInput, { target: { value: "2025-10-01" } });
    fireEvent.change(categorySelect, { target: { value: "food" } });
    fireEvent.change(amountInput, { target: { value: "25.50" } });

    fireEvent.click(submitButton);

    expect(addTransactionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "expenses",
        category: "food",
        amount: 25.5,
        date: "2025-10-01",
      })
    );

    expect(dateInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
    expect(amountInput).toHaveValue(null);
  });

  it("does not call addTransaction if any field is missing", () => {
    render(<TransactionForm type="income" onDismiss={onDismissMock} />);
    const submitButton = screen.getByText("buttons.addNew");
    fireEvent.click(submitButton);
    expect(addTransactionMock).not.toHaveBeenCalled();
  });
});
