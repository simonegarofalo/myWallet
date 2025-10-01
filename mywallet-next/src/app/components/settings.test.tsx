import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Settings from "../components/settings";
import { ThemeProvider } from "../context/themeContext";
import * as themeHook from "../hooks/useTheme";

jest.mock("../components/languageSelector", () => () => <div data-testid="language-selector" />);
jest.mock("../components/themeSelector", () => () => <div data-testid="theme-selector" />);

describe("Settings component", () => {
  const mockOnClose = jest.fn();

  const renderWithProvider = (isOpen: boolean) =>
    render(
      <ThemeProvider>
        <Settings isOpen={isOpen} onClose={mockOnClose} />
      </ThemeProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the menu only when isOpen is true", () => {
    renderWithProvider(false);
    expect(screen.queryByText("myWallet")).not.toBeInTheDocument();

    renderWithProvider(true);
    expect(screen.getByText("myWallet")).toBeInTheDocument();
  });

  it("calls onClose when the return icon is clicked", () => {
    renderWithProvider(true);
    const returnIcon = screen.getByAltText("arrow-back-icon");
    fireEvent.click(returnIcon);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders LanguageSelector and ThemeSelector components", () => {
    renderWithProvider(true);
    expect(screen.getByTestId("language-selector")).toBeInTheDocument();
    expect(screen.getByTestId("theme-selector")).toBeInTheDocument();
  });

  it("displays correct logo based on theme", () => {
    jest.spyOn(themeHook, "useTheme").mockReturnValue({ theme: "light", toggleTheme: jest.fn() });
    const { rerender } = renderWithProvider(true);
    expect(screen.getByAltText("myWallet-logo")).toHaveAttribute("src", "/light-mode-logo.svg");

    jest.spyOn(themeHook, "useTheme").mockReturnValue({ theme: "dark", toggleTheme: jest.fn() });
    rerender(
      <ThemeProvider>
        <Settings isOpen={true} onClose={mockOnClose} />
      </ThemeProvider>
    );
    expect(screen.getByAltText("myWallet-logo")).toHaveAttribute("src", "/dark-mode-logo.svg");
  });
});