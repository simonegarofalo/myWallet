'use client';

import { useTranslation } from 'react-i18next';

type TransactionButtonProps = {
  labelKey: string;
  ariaLabel: string;
  onClick: () => void;
};

export default function TransactionButton({ labelKey, ariaLabel, onClick }: TransactionButtonProps) {
  const { t } = useTranslation();

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