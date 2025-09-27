'use client';

import { useTransactions } from '../../hooks/useTransactions';
import TotalBalance from "./totalBalance";
import IncomeExpensesSummary from "./incomeExpensesSummary";

export default function BalanceSection(){ 
  const { totalBalance, totalIncome, totalExpenses } = useTransactions();

    return(
      <section className="balance-wrapper">
      <TotalBalance total={totalBalance} />
      <IncomeExpensesSummary income={totalIncome} expenses={totalExpenses} />
      </section>
    )
}