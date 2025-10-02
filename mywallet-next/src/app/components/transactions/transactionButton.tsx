"use client";

import { useTranslation } from "react-i18next";
import { useLang } from "../../hooks/useLang";

type TransactionButtonProps = {
  labelKey: string;
  ariaLabel: string;
  onClick: () => void;
};

export default function TransactionButton({
  labelKey,
  ariaLabel,
  onClick,
}: TransactionButtonProps) {
  const { isReady } = useLang();
  const { t } = useTranslation();

  if (!isReady) return null;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="form-button"
      onClick={onClick}
    >
      {t(labelKey)}
    </button>
  );
}
