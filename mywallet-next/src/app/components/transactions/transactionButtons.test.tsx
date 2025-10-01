import { render, screen, fireEvent } from "@testing-library/react";
import TransactionButtons from "./transactionButtons";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("TransactionButtons component", () => {
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders both buttons with correct labels", () => {
    render(<TransactionButtons onClick={onClickMock} />);

    expect(screen.getByText("buttons.addExpenses")).toBeInTheDocument();
    expect(screen.getByText("buttons.addIncome")).toBeInTheDocument();
  });

  it("calls onClick with 'expenses' when the expenses button is clicked", () => {
    render(<TransactionButtons onClick={onClickMock} />);

    fireEvent.click(screen.getByText("buttons.addExpenses"));
    expect(onClickMock).toHaveBeenCalledWith("expenses");
  });

  it("calls onClick with 'income' when the income button is clicked", () => {
    render(<TransactionButtons onClick={onClickMock} />);

    fireEvent.click(screen.getByText("buttons.addIncome"));
    expect(onClickMock).toHaveBeenCalledWith("income");
  });
});
