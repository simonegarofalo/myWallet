"use client";

import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useLang } from "../../hooks/useLang";
import Image from "next/image";
import Link from "next/link";

type NotificationsProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  supportsHover: boolean;
};

export default function Notifications({
  open,
  setOpen,
  supportsHover,
}: NotificationsProps) {
  const { isReady } = useLang();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const githubIcon =
    theme === "light"
      ? "/icons/light-mode-github-icon.svg"
      : "/icons/dark-mode-github-icon.svg";

  if (!isReady) return null;

  return (
    <div
      id="updates-box"
      className={`updates-box ${open ? "" : "obscure"}`}
      onMouseEnter={() => supportsHover && setOpen(true)}
      onMouseLeave={() =>
        supportsHover && setTimeout(() => setOpen(false), 150)
      }
    >
      <p>{t("newsMessage.githubLink")}</p>
      <div className="green-circle">
        <div className="pulsing green-circle-shadow"></div>
      </div>
      <div className="github-wrapper">
        <Image src={githubIcon} alt="github-icon" width={20} height={20} />
        <Link href="https://github.com/simonegarofalo/myWallet">
          https://github.com/simonegarofalo/myWallet
        </Link>
      </div>
    </div>
  );
}
