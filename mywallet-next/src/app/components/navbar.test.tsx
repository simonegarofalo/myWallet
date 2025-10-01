import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./navbar";

jest.mock("../hooks/useTheme", () => ({
  useTheme: jest.fn(),
}));

jest.mock("next/image", () => (props: any) => {
  return <img {...props} alt={props.alt} />;
});

jest.mock("./notifications", () => (props: any) => (
  <div data-testid="notifications" data-open={props.open}></div>
));
jest.mock("./settings", () => (props: any) => (
  <div data-testid="settings" data-open={props.isOpen}></div>
));

describe("Navbar component", () => {
  const { useTheme } = jest.requireMock("../hooks/useTheme");

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(hover: hover)" ? false : false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("renders the light logo when theme=light", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });
    render(<Navbar />);
    expect(screen.getByAltText("myWallet-logo")).toHaveAttribute("src", "/light-mode-logo.svg");
  });
  
  it("renders the dark logo when theme=dark", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });
    render(<Navbar />);
    expect(screen.getByAltText("myWallet-logo")).toHaveAttribute("src", "/dark-mode-logo.svg");
  });  

  it("toggles notifications on click when supportsHover=false", () => {
    render(<Navbar />);

    const notificationsIcon = screen.getByAltText("notifications-icon").closest("div")!;
    const notifications = screen.getByTestId("notifications");

    expect(notifications).toHaveAttribute("data-open", "false");

    fireEvent.click(notificationsIcon);
    expect(notifications).toHaveAttribute("data-open", "true");

    fireEvent.click(notificationsIcon);
    expect(notifications).toHaveAttribute("data-open", "false");
  });

  it("opens settings when settings icon is clicked", () => {
    render(<Navbar />);

    const settingsIcon = screen.getByAltText("settings-icon").closest("div")!;
    const settings = screen.getByTestId("settings");

    expect(settings).toHaveAttribute("data-open", "false");

    fireEvent.click(settingsIcon);
    expect(settings).toHaveAttribute("data-open", "true");
  });
});
