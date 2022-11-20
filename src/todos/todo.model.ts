export class Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
}

export type TodoStatus = 'OPEN' | 'DONE' | 'BLOCKED' | 'IN_PROGRESS';
export type TodoPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
