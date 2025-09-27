'use client';

import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  title?: string;
  message: string | ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function AlertModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        {title && <h3 className="modal-title">{title}</h3>}
        <div className="modal-message">{message}</div>
        <div className="modal-actions">
          <button className="modal-btn confirm" onClick={onConfirm}>{confirmText}</button>
          <button className="modal-btn cancel" onClick={onCancel}>{cancelText}</button>
        </div>
      </div>
    </div>
  )
}