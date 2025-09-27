'use client';

import TotalBalance from "./totalBalance";
import IncomeExpensesSummary from "./incomeExpensesSummary";

type BalanceSectionProps = {
  total: number;
  income: number;
  expenses: number;
}
export default function BalanceSection({ total, income, expenses} : BalanceSectionProps ) {
    return(
      <section className="balance-wrapper">
      <TotalBalance total={total} />
      <IncomeExpensesSummary income={income} expenses={expenses} />
      </section>
    )
}