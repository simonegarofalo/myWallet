import { render, screen, fireEvent } from "@testing-library/react";
import TransactionButton from "./transactionButton";

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

describe("TransactionButton component", () => {
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the button with translated label", () => {
    render(
      <TransactionButton
        labelKey="submitTransaction"
        ariaLabel="submit-button"
        onClick={onClickMock}
      />
    );

    expect(screen.getByText("submitTransaction")).toBeInTheDocument();

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "submit-button"
    );
  });

  it("calls onClick when button is clicked", () => {
    render(
      <TransactionButton
        labelKey="submitTransaction"
        ariaLabel="submit-button"
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
