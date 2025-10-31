import { Column } from '../types';

export const generateColumnId = (): string => {
  return `column-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createColumn = (
  title: string,
  overrides?: Partial<Column>
): Column => {
  return {
    id: generateColumnId(),
    title,
    color: '#6b7280',
    taskIds: [],
    ...overrides,
  };
};

export const reorderTasksInColumn = (
  taskIds: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = Array.from(taskIds);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const moveTaskBetweenColumns = (
  sourceTaskIds: string[],
  destinationTaskIds: string[],
  sourceIndex: number,
  destinationIndex: number
): { source: string[]; destination: string[] } => {
  const sourceClone = Array.from(sourceTaskIds);
  const destClone = Array.from(destinationTaskIds);
  const [removed] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destinationIndex, 0, removed);

  return {
    source: sourceClone,
    destination: destClone,
  };
};

export const getColumnTaskCount = (column: Column): number => {
  return column.taskIds.length;
};

export const isColumnEmpty = (column: Column): boolean => {
  return column.taskIds.length === 0;
};
