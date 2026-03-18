'use client';

import { useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { ModalData } from '../types/modal';

export function useModal() {
  const { modal, isModalOpen, openModal, closeModal } = useDashboard();

  const showAlertModal = useCallback(
    (alertData: {
      id: string;
      title: string;
      suggestion: string;
      signals: { label: string; value: string }[];
      ruleActions: ModalData['actions'];
    }) => {
      openModal({
        id: alertData.id,
        title: alertData.title,
        body: alertData.suggestion,
        signals: alertData.signals,
        actions: alertData.ruleActions,
      });
    },
    [openModal]
  );

  return { modal, isModalOpen, openModal, closeModal, showAlertModal };
}
