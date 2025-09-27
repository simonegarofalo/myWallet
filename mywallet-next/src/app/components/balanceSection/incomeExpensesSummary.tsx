'use client';

import { useTranslation } from 'react-i18next';

type IncomeExpensesSummaryProps = {
    income: number;
    expenses: number;
};

export default function IncomeExpensesSummary({ income, expenses} : IncomeExpensesSummaryProps ){
    const { t } = useTranslation();

    return(
        <div className="balance-content">
        <div className="expenses-content">
          <span className="expenses-category">
          {t('totals.expenses')}
          </span>
          <p className="total-expenses">{expenses.toFixed(2)} €</p>
        </div>
        <div className="income-content">
          <span className="income-category"
            >{t('totals.income')}
            </span>
          <p className="total-income">{income.toFixed(2)} €</p>
        </div>
      </div>
    )
}