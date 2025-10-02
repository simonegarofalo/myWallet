import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "./languageSelector";

const mockSwitchLang = jest.fn();

jest.mock("../hooks/useLang", () => ({
  useLang: () => ({
    switchLang: mockSwitchLang,
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

describe("LanguageSelector", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders language selection text", () => {
    render(<LanguageSelector />);
    expect(screen.getByText("buttons.languageSelection")).toBeInTheDocument();
  });

  it("renders both flags", () => {
    render(<LanguageSelector />);
    expect(screen.getByAltText("uk-lang")).toBeInTheDocument();
    expect(screen.getByAltText("ita-lang")).toBeInTheDocument();
  });

  it("calls switchLang with 'en' when UK flag is clicked", () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByAltText("uk-lang"));
    expect(mockSwitchLang).toHaveBeenCalledWith("en");
  });

  it("calls switchLang with 'it' when IT flag is clicked", () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByAltText("ita-lang"));
    expect(mockSwitchLang).toHaveBeenCalledWith("it");
  });
});
