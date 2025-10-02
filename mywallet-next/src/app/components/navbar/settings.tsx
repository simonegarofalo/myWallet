"use client";

import { useTheme } from "../../hooks/useTheme";
import Image from "next/image";
import LanguageSelector from "../navbar/languageSelector";
import { useLang } from "../../hooks/useLang";
import ThemeSelector from "./themeSelector";

export default function Settings({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isReady } = useLang();
  const { theme } = useTheme();
  const logo =
    theme === "light" ? "/light-mode-logo.svg" : "/dark-mode-logo.svg";

  if (!isReady) return null;

  return (
    <div className={`settings-menu ${isOpen ? "" : "hidden"}`}>
      <div className="main-menu-wrapper">
        <div id="return-icon" className="icon-container" onClick={onClose}>
          <Image
            src="/icons/arrow-back-dark-mode.svg"
            alt="arrow-back-icon"
            width={40}
            height={40}
          />
        </div>
      </div>
      <LanguageSelector />
      <ThemeSelector />
      <div className="secondary-logo">
        <Image src={logo} alt="myWallet-logo" width={40} height={40} />
        <span>myWallet</span>
      </div>
    </div>
  );
}
