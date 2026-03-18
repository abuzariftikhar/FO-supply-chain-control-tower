import { ModalActionType } from '../enums';

export interface ModalAction {
  type: ModalActionType;
  label: string;
  target: string;
  icon?: string;
}

export interface ModalData {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  actions: ModalAction[];
  signals?: { label: string; value: string }[];
}
