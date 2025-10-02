import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Settings from "./settings";

jest.mock("../../hooks/useLang", () => ({
  useLang: () => ({
    switchLang: jest.fn(),
    isReady: true,
  }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

jest.mock("../../hooks/useTheme", () => ({
  useTheme: () => ({
    theme: "light",
  }),
}));

const renderWithProvider = (isOpen: boolean = true) =>
  render(<Settings isOpen={isOpen} onClose={jest.fn()} />);

describe("Settings component", () => {
  it("renders the menu only when isOpen is true", () => {
    renderWithProvider(false);
    expect(screen.queryByText("myWallet")).not.toBeInTheDocument();

    renderWithProvider(true);
    expect(screen.getAllByText("myWallet")[0]).toBeInTheDocument();
  });

  it("calls onClose when the return icon is clicked", () => {
    const onCloseMock = jest.fn();
    render(<Settings isOpen={true} onClose={onCloseMock} />);
    const returnIcon = screen.getByAltText("arrow-back-icon");
    fireEvent.click(returnIcon);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("renders language and theme selectors", () => {
    renderWithProvider(true);
    expect(screen.getByTestId("language-selector")).toBeInTheDocument();
    expect(screen.getByTestId("theme-selector")).toBeInTheDocument();
  });

  it("displays correct logo based on theme", () => {
    renderWithProvider(true);
    const logo = screen.getByAltText("myWallet-logo") as HTMLImageElement;
    expect(logo.src).toContain("light-mode-logo.svg");
  });
});
