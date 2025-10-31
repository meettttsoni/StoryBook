export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: Priority;
  assignee?: string;
  tags: string[];
  createdAt: Date;
  dueDate?: Date;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  taskIds: string[];
}

export interface KanbanBoardState {
  columns: Column[];
  tasks: Record<string, Task>;
}

export interface DragItem {
  id: string;
  columnId: string;
  index: number;
}
