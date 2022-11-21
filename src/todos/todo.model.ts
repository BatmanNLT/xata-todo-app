export class Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
  BLOCKED = 'BLOCKED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export enum TodoPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}
