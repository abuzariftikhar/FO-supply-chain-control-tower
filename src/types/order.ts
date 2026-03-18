import { OrderStatus, DueDateWindow, PlantId, Severity } from '../enums';

export interface Order {
  id: string;
  customer: string;
  part: string;
  qty: number;
  dueDate: DueDateWindow;
  plant: PlantId;
  risk: string;
  status: OrderStatus;
  severity: Severity;
  value: string;
}

export interface OrdersData {
  orders: Order[];
}
