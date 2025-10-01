import { render, screen, fireEvent } from "@testing-library/react";
import TransactionFormsHandler from "./transactionFormHandler";

jest.mock("./transactionButtons", () => (props: any) => (
  <div>
    <button onClick={() => props.onClick("expenses")}>Open Expenses</button>
    <button onClick={() => props.onClick("income")}>Open Income</button>
  </div>
));

jest.mock("./transactionForm", () => (props: any) => (
  <div>
    <span>Form: {props.type}</span>
    <button onClick={props.onDismiss}>Dismiss</button>
  </div>
));

describe("TransactionFormsHandler component", () => {
  it("renders TransactionButtons initially", () => {
    render(<TransactionFormsHandler />);
    expect(screen.getByText("Open Expenses")).toBeInTheDocument();
    expect(screen.getByText("Open Income")).toBeInTheDocument();
    expect(screen.queryByText(/Form:/)).not.toBeInTheDocument();
  });

  it("opens expenses form when expenses button is clicked", () => {
    render(<TransactionFormsHandler />);
    fireEvent.click(screen.getByText("Open Expenses"));
    expect(screen.getByText("Form: expenses")).toBeInTheDocument();
  });

  it("opens income form when income button is clicked", () => {
    render(<TransactionFormsHandler />);
    fireEvent.click(screen.getByText("Open Income"));
    expect(screen.getByText("Form: income")).toBeInTheDocument();
  });

  it("closes form when dismiss button is clicked", () => {
    render(<TransactionFormsHandler />);
    fireEvent.click(screen.getByText("Open Expenses"));
    expect(screen.getByText("Form: expenses")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Dismiss"));
    expect(screen.queryByText("Form: expenses")).not.toBeInTheDocument();
  });
});
