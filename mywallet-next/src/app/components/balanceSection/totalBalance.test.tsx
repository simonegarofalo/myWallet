import { render, screen } from "@testing-library/react";
import TotalBalance from "./totalBalance";

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

describe("TotalBalance component", () => {
  it("renders zero balance correctly", () => {
    render(<TotalBalance total={0} />);

    const totalEl = screen.getByText("0.00 €", { exact: false });
    expect(totalEl).toBeInTheDocument();
  });

  it("renders a positive balance correctly", () => {
    render(<TotalBalance total={123.45} />);

    const totalEl = screen.getByText("123.45 €", { exact: false });
    expect(totalEl).toBeInTheDocument();
  });

  it("renders the label correctly", () => {
    render(<TotalBalance total={0} />);

    const labelEl = screen.getByText("totals.balance");
    expect(labelEl).toBeInTheDocument();
  });
});
