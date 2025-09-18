export interface Sector {
  id: string;
  name: string;
  color: string;
}

export type TaskType = "daily" | "monthly" | "temporary";
export type UrgencyLevel = "urgent" | "moderate" | "low";
export type TaskStatus = "pending" | "in_progress" | "completed" | "overdue";
export type DeliveryStatus = "delivered" | "not_delivered";

export interface Task {
  id: string;
  title: string;
  description: string;
  sectorId: string;
  type: TaskType;
  urgency: UrgencyLevel;
  status: TaskStatus;
  deliveryStatus?: DeliveryStatus;
  deliveryNotes?: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFormData {
  title: string;
  description: string;
  sectorId: string;
  type: TaskType;
  urgency: UrgencyLevel;
  dueDate: Date;
}