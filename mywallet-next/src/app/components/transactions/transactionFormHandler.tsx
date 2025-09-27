'use client';

import { useState } from "react";
import TransactionForm from "./transactionForm";
import TransactionButtons from "./transactionButtons";

export default function TransactionFormsHandler() {
  const [activeForm, setActiveForm] = useState<"income" | "expenses" | null>(null);

  const handleOpenForm = (type: "income" | "expenses") => {
    setActiveForm(type);
  };

  const handleCloseForm = () => {
    setActiveForm(null);
  };

  return (
    <section>
      <TransactionButtons onClick={handleOpenForm} />
      {activeForm && (
        <TransactionForm type={activeForm} onDismiss={handleCloseForm} />
      )}
    </section>
  );
}
