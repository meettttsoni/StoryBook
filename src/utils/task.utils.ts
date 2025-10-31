import { Task, Priority } from '../types';

export const generateTaskId = (): string => {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createTask = (
  title: string,
  status: string,
  overrides?: Partial<Task>
): Task => {
  return {
    id: generateTaskId(),
    title,
    description: '',
    status,
    priority: 'medium',
    assignee: '',
    tags: [],
    createdAt: new Date(),
    dueDate: undefined,
    ...overrides,
  };
};

export const getPriorityColor = (priority: Priority): string => {
  const colors: Record<Priority, string> = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    urgent: 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[priority];
};

export const getPriorityLabel = (priority: Priority): string => {
  const labels: Record<Priority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };
  return labels[priority];
};

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder: Record<Priority, number> = {
    urgent: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  return [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export const filterTasksByTag = (tasks: Task[], tag: string): Task[] => {
  return tasks.filter((task) => task.tags.includes(tag));
};

export const searchTasks = (tasks: Task[], query: string): Task[] => {
  const lowerQuery = query.toLowerCase();
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description?.toLowerCase().includes(lowerQuery) ||
      task.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

export const isOverdue = (task: Task): boolean => {
  if (!task.dueDate) return false;
  return new Date(task.dueDate) < new Date() && task.status !== 'done';
};
