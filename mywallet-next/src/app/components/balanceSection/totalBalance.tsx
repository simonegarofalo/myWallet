'use client';

import { useTranslation } from 'react-i18next';

type TotalBalanceProps = {
    total: number;
}

export default function TotalBalance({ total} : TotalBalanceProps) {
    const { t } = useTranslation();

    return(
        <div className="total-balance-wrapper">
          <span>{t('totals.balance')}</span>
          <div className="total-value-wrapper">
            <p className="total-balance">{total.toFixed(2)} €</p>
          </div>
        </div>
    )
}