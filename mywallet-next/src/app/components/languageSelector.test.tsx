import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "./languageSelector";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

jest.mock("../hooks/useLang");

import { useLang } from "../hooks/useLang";

describe("LanguageSelector", () => {
  const mockUseLang = useLang as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders language selection text", () => {
    mockUseLang.mockReturnValue({ switchLang: jest.fn() });

    render(<LanguageSelector />);
    expect(screen.getByText(/languageSelection/i)).toBeInTheDocument();
  });

  it("renders both flags", () => {
    mockUseLang.mockReturnValue({ switchLang: jest.fn() });

    render(<LanguageSelector />);
    expect(screen.getByAltText("uk-lang")).toBeInTheDocument();
    expect(screen.getByAltText("ita-lang")).toBeInTheDocument();
  });

  it("calls switchLang with 'en' when UK flag is clicked", () => {
    const mockSwitchLang = jest.fn();
    mockUseLang.mockReturnValue({ switchLang: mockSwitchLang });

    render(<LanguageSelector />);
    fireEvent.click(screen.getByAltText("uk-lang"));
    expect(mockSwitchLang).toHaveBeenCalledWith("en");
  });

  it("calls switchLang with 'it' when IT flag is clicked", () => {
    const mockSwitchLang = jest.fn();
    mockUseLang.mockReturnValue({ switchLang: mockSwitchLang });

    render(<LanguageSelector />);
    fireEvent.click(screen.getByAltText("ita-lang"));
    expect(mockSwitchLang).toHaveBeenCalledWith("it");
  });
});