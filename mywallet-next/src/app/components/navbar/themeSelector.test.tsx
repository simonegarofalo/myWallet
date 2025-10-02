import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../../components/navbar/themeSelector";

jest.mock("../../hooks/useTheme", () => ({
  useTheme: jest.fn(),
}));

jest.mock("../../hooks/useLang", () => ({
  useLang: () => ({
    switchLang: jest.fn(),
    isReady: true,
  }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

import { useTheme } from "../../hooks/useTheme";

describe("ThemeToggle component", () => {
  it("renders the theme toggle button", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it("shows the moon icon when theme is light", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    expect(screen.getByAltText(/switch to dark theme/i)).toBeInTheDocument();
  });

  it("shows the sun icon when theme is dark", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    expect(screen.getByAltText(/switch to light theme/i)).toBeInTheDocument();
  });

  it("calls toggleTheme on button click", () => {
    const toggleMock = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: toggleMock,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
