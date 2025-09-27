'use client';

import { createContext, useState, ReactNode, useMemo } from 'react';

type Transaction = {
  id: string;
  type: 'income' | 'expenses';
  category: string;
  amount: number;
  date: string;
};

type TransactionsContextType = {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
};

export const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter(t => t.type === 'expenses').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalBalance = totalIncome - totalExpenses;

  return (
    <TransactionsContext.Provider value={{ transactions, totalIncome, totalExpenses, totalBalance, addTransaction, removeTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};
