"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTransactions } from "../../hooks/useTransactions";
import { useLang } from "../../hooks/useLang";

import {
  expenseCategories,
  incomeCategories,
} from "../../../../data/categories";

type TransactionFormProps = {
  type: "income" | "expenses";
  onDismiss: () => void;
};

export default function TransactionForm({
  type,
  onDismiss,
}: TransactionFormProps) {
  const { isReady } = useLang();
  const { t } = useTranslation();
  const { addTransaction } = useTransactions();

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  const categories = type === "income" ? incomeCategories : expenseCategories;
  const categoriesTranslated = categories.map((c) => ({
    value: c.value,
    label: t(`forms.${type}Categories.${c.value}`),
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !category || !amount) return;

    addTransaction({
      id: crypto.randomUUID(),
      type,
      category,
      amount: Number(amount),
      date,
    });

    setDate("");
    setCategory("");
    setAmount("");
  };

  const formTitle = `${t("forms.formTitle")} ${t(
    type === "income" ? "forms.incomeCategory" : "forms.expensesCategory"
  )}`;

  if (!isReady) return null;

  return (
    <section>
      <h3 className="form-title">
        <b>{formTitle}</b>
      </h3>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span className="form-label">{t("forms.formLabel.dateLabel")}</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          <span className="form-label">
            {t("forms.formLabel.categoryLabel")}
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">{t("forms.expensesCategories.all")}</option>
            {categoriesTranslated.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="form-label">{t("forms.formLabel.amountLabel")}</span>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            placeholder="0.00€"
            step="0.01"
            min="0"
            onChange={(e) =>
              setAmount(e.target.value ? Number(e.target.value) : "")
            }
            required
          />
        </label>
        <div className="form-controls-wrapper">
          <button
            type="button"
            className="form-button dismiss-button"
            onClick={onDismiss}
          >
            {t("buttons.dismiss")}
          </button>
          <button type="submit" className="confirm-button">
            {t("buttons.addNew")}
          </button>
        </div>
      </form>
    </section>
  );
}
