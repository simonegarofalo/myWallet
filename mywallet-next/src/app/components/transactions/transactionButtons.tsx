'use client';

import TransactionButton from './transactionButton';

export default function TransactionButtons() {
  return (
    <section className="transactions-wrapper">
      <TransactionButton
        labelKey="buttons.addExpenses"
        ariaLabel="Add expenses"
        onClick={() => console.log("Open expenses form")}
      />
      <TransactionButton
        labelKey="buttons.addIncome"
        ariaLabel="Add income"
        onClick={() => console.log("Open income form")}
      />
    </section>
  );
}
