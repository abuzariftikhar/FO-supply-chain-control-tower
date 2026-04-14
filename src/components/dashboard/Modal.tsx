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
    <div>
      <div className="mb-4">
        <h2 className="text-[1.1rem] font-extrabold mb-1" id="modal-title">
          {modal.title}
        </h2>
        {modal.subtitle && (
          <p className="text-xs text-muted">{modal.subtitle}</p>
        )}
      </div>

      <div className="text-[0.8rem] text-muted leading-normal mb-4">{modal.body}</div>

      {modal.signals && modal.signals.length > 0 && (
        <div className="mb-4">
          <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-muted mb-2">📡 Root Cause Signals</h4>
          {modal.signals.map((signal, i) => (
            <div key={i} className="flex justify-between items-center py-[0.35rem] border-b border-border-subtle text-[0.7rem] last:border-b-0">
              <span className="text-muted">{signal.label}</span>
              <span className="font-semibold text-text-primary">{signal.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {modal.actions.map((action, i) => (
          <button
            key={i}
            className={`inline-flex items-center gap-[0.3rem] px-3.5 py-[0.4rem] rounded-lg border text-[0.72rem] font-semibold cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap ${
              i === 0
                ? 'bg-accent border-accent text-white hover:bg-accent-hover'
                : 'bg-transparent border-border-subtle text-muted hover:text-text-primary'
            }`}
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
      className="fixed inset-0 bg-black/70 backdrop-blur-[4px] z-[999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-panel backdrop-blur-[12px] border border-border-subtle rounded-xl shadow-modal w-full max-w-[560px] max-h-[85vh] overflow-y-auto relative">
        <button
          className="absolute top-3 right-3 bg-card border border-border-subtle rounded text-muted cursor-pointer px-2 py-1 text-xs transition-all duration-200 ease-in-out z-[1] hover:text-text-primary hover:border-text-primary"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="p-6">
          <ModalContent modal={modal} />
        </div>
      </div>
    </div>
  );
}
