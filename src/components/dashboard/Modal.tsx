'use client';

import React, { useEffect } from 'react';
import { ModalData } from '../../types/modal';
import { ModalActionType } from '../../enums';
import { ModalActionTypeIconMap } from '../../lib/enum-helpers';
import { useDashboard } from '../../context/DashboardContext';
import { PageId } from '../../enums';

interface ModalContentProps {
  modal: ModalData;
}

function ModalContent({ modal }: ModalContentProps) {
  const { setActivePage, closeModal } = useDashboard();

  function handleAction(type: ModalActionType, target: string) {
    if (type === ModalActionType.Navigate || type === ModalActionType.Drilldown) {
      const [page] = target.split('?');
      if (Object.values(PageId).includes(page as PageId)) {
        setActivePage(page as PageId);
        closeModal();
      }
    } else if (type === ModalActionType.External) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <div className="modal-content">
      <div className="modal-content__header">
        <h2 className="modal-content__title" id="modal-title">
          {modal.title}
        </h2>
        {modal.subtitle && (
          <p className="modal-content__subtitle">{modal.subtitle}</p>
        )}
      </div>

      <div className="modal-content__body">{modal.body}</div>

      {modal.signals && modal.signals.length > 0 && (
        <div className="modal-content__signals">
          <h4 className="modal-content__signals-title">📡 Root Cause Signals</h4>
          {modal.signals.map((signal, i) => (
            <div key={i} className="signal-item">
              <span className="signal-item__label">{signal.label}</span>
              <span className="signal-item__value">{signal.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="modal-content__actions">
        {modal.actions.map((action, i) => (
          <button
            key={i}
            className={`btn ${i === 0 ? 'btn--primary' : 'btn--secondary'}`}
            onClick={() => handleAction(action.type, action.target)}
          >
            {ModalActionTypeIconMap[action.type]} {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ModalProps {
  modal: ModalData;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ modal, isOpen, onClose }: ModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="modal__body">
          <ModalContent modal={modal} />
        </div>
      </div>
    </div>
  );
}
