"use client";

import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useLang } from "../hooks/useLang";

import Image from "next/image";

export default function ThemeToggle() {
  const { isReady } = useLang();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  if (!isReady) return null;

  return (
    <div className="setting-wrapper">
      <p>{t("buttons.themeSelection")}</p>
      <div className="feature-wrapper">
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Image
              src="/icons/moon.svg"
              alt="Switch to dark theme"
              width={36}
              height={36}
            />
          ) : (
            <Image
              src="/icons/sun.svg"
              alt="Switch to light theme"
              width={36}
              height={36}
            />
          )}
        </button>
      </div>
    </div>
  );
}
