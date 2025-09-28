'use client';

import { useTheme } from "../../hooks/useTheme";
import { useState } from 'react';
import AlertModal from '../alertModal';
import { useTransactions } from '../../hooks/useTransactions';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export default function TransactionsList() {
  const { t, i18n } = useTranslation();
  const { transactions, removeTransaction } = useTransactions();

  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleDeleteClick = (id: string) => {
    setSelectedTxId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTxId) removeTransaction(selectedTxId);
    setModalOpen(false);
    setSelectedTxId(null);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setSelectedTxId(null);
  };

  const getCategoryLabel = (tx: typeof transactions[0]) => {
    const key =
      tx.type === 'income'
        ? `forms.incomeCategories.${tx.category}`
        : `forms.expensesCategories.${tx.category}`;
    return t(key, tx.category);
  };

  const getTypeLabel = (tx: typeof transactions[0]) => {
    return tx.type === 'income' ? t('forms.incomeCategory') : t('forms.expensesCategory');
  };

  const { theme } = useTheme();
  const arrow = theme === 'light' ? '/icons/light-mode-arrow-down.svg' : '/icons/dark-mode-arrow-down.svg';

  return (
    <section className="expenses-wrapper">
      <div className="transactions-content" onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
        <h2>{t('table.showRecent')}</h2>
        <Image
          id="icon-toggle"
          src={arrow}
          alt="arrow-toggle"
          width={20}
          height={20}
          className={isVisible ? 'rotate' : ''}
        />
      </div>

      {isVisible && (
        <div className="transactions-list">
          {transactions.length === 0 ? (
            <p className="no-transactions">{t('table.noTransactions')}</p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className={`transaction-item ${tx.type === 'income' ? 'income' : 'expenses'}`}
              >
                <div className="transaction-info">
                  <span className="transaction-category">{getCategoryLabel(tx)}</span>
                  <div className="transaction-details">
                    <div>
                      <span className="transaction-date">{formatDate(tx.date, i18n.language)}</span>
                      <span className="transaction-type">{getTypeLabel(tx)}</span>
                    </div>
                    <span className="transaction-amount">{tx.amount.toFixed(2)} €</span>
                  </div>
                  <button
                    className="delete-transaction"
                    onClick={() => handleDeleteClick(tx.id)}
                    aria-label={t('alerts.deleteTransaction')}
                  >
                    <Image
                      src="/icons/basket.png"
                      alt={t('alerts.deleteTransaction')}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <AlertModal
        isOpen={modalOpen}
        message={t('alerts.deleteTransaction')}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText={t('alerts.confirm')}
        cancelText={t('alerts.cancel')}
      />
    </section>
  );
}