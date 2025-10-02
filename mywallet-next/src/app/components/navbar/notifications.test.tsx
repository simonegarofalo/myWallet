import { render, screen, fireEvent, act } from "@testing-library/react";
import Notifications from "./notifications";

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
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("next/image", () => (props: any) => {
  return <img {...props} alt={props.alt} />;
});

describe("Notifications component", () => {
  const setOpenMock = jest.fn();
  const { useTheme } = jest.requireMock("../../hooks/useTheme");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders message and GitHub link", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

    render(
      <Notifications open={true} setOpen={setOpenMock} supportsHover={false} />
    );

    expect(screen.getByText("newsMessage.githubLink")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "https://github.com/simonegarofalo/myWallet",
      })
    ).toHaveAttribute("href", "https://github.com/simonegarofalo/myWallet");
  });

  it("applies obscure class when open=false", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

    const { container } = render(
      <Notifications open={false} setOpen={setOpenMock} supportsHover={false} />
    );

    expect(container.firstChild).toHaveClass("obscure");
  });

  it("calls setOpen(true) on mouse enter if supportsHover=true", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

    const { container } = render(
      <Notifications open={false} setOpen={setOpenMock} supportsHover={true} />
    );

    const updatesBox = container.querySelector("#updates-box")!;
    fireEvent.mouseEnter(updatesBox);

    expect(setOpenMock).toHaveBeenCalledWith(true);
  });

  it("calls setOpen(false) on mouse leave if supportsHover=true", () => {
    jest.useFakeTimers();
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

    const { container } = render(
      <Notifications open={true} setOpen={setOpenMock} supportsHover={true} />
    );

    const updatesBox = container.querySelector("#updates-box")!;
    fireEvent.mouseLeave(updatesBox);

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(setOpenMock).toHaveBeenCalledWith(false);
    jest.useRealTimers();
  });

  it("renders correct GitHub icon based on theme", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });

    render(
      <Notifications open={true} setOpen={setOpenMock} supportsHover={false} />
    );

    const img = screen.getByAltText("github-icon");
    expect(img).toHaveAttribute("src", "/icons/dark-mode-github-icon.svg");
  });
});
