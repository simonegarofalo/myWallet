'use client';

import { useTranslation } from "react-i18next";

type TransactionButtonsProps = {
  onClick: (type: "income" | "expenses") => void;
};

export default function TransactionButtons({ onClick }: TransactionButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="transactions-wrapper">
      <button
        type="button"
        className="form-button"
        onClick={() => onClick("expenses")}
      >
        {t("buttons.addExpenses")}
      </button>
      <button
        type="button"
        className="form-button"
        onClick={() => onClick("income")}
      >
        {t("buttons.addIncome")}
      </button>
    </div>
  );
}
