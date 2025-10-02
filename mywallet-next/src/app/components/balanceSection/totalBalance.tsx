"use client";

import { useTranslation } from "react-i18next";
import { useLang } from "../../hooks/useLang";

type TotalBalanceProps = {
  total: number;
};

export default function TotalBalance({ total }: TotalBalanceProps) {
  const { isReady } = useLang();
  const { t } = useTranslation();

  if (!isReady) return null;

  return (
    <div className="total-balance-wrapper">
      <span>{t("totals.balance")}</span>
      <div className="total-value-wrapper">
        <p className="total-balance">{total.toFixed(2)} €</p>
      </div>
    </div>
  );
}
