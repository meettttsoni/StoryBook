import { useState, useCallback } from 'react';
import { Task, Column, KanbanBoardState } from '../types';
import { createTask } from '../utils/task.utils';
import { reorderTasksInColumn, moveTaskBetweenColumns } from '../utils/column.utils';

export interface UseKanbanBoardReturn {
  columns: Column[];
  tasks: Record<string, Task>;
  addTask: (columnId: string, title: string, taskData?: Partial<Task>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string, columnId: string) => void;
  moveTask: (
    taskId: string,
    sourceColumnId: string,
    destinationColumnId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  reorderTask: (columnId: string, startIndex: number, endIndex: number) => void;
}

export const useKanbanBoard = (
  initialColumns: Column[],
  initialTasks: Record<string, Task>
): UseKanbanBoardReturn => {
  const [state, setState] = useState<KanbanBoardState>({
    columns: initialColumns,
    tasks: initialTasks,
  });

  const addTask = useCallback(
    (columnId: string, title: string, taskData?: Partial<Task>) => {
      const column = state.columns.find((col) => col.id === columnId);
      if (!column) return;

      const newTask = createTask(title, columnId, taskData);

      setState((prevState) => ({
        ...prevState,
        tasks: {
          ...prevState.tasks,
          [newTask.id]: newTask,
        },
        columns: prevState.columns.map((col) =>
          col.id === columnId
            ? { ...col, taskIds: [...col.taskIds, newTask.id] }
            : col
        ),
      }));
    },
    [state.columns]
  );

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setState((prevState) => {
      const task = prevState.tasks[taskId];
      if (!task) return prevState;

      // If status is being updated, move task to new column
      if (updates.status && updates.status !== task.status) {
        const sourceColumn = prevState.columns.find((col) =>
          col.taskIds.includes(taskId)
        );
        const destColumn = prevState.columns.find(
          (col) => col.id === updates.status
        );

        if (sourceColumn && destColumn) {
          const sourceTaskIds = sourceColumn.taskIds.filter((id) => id !== taskId);
          const destTaskIds = [...destColumn.taskIds, taskId];

          return {
            ...prevState,
            tasks: {
              ...prevState.tasks,
              [taskId]: { ...task, ...updates },
            },
            columns: prevState.columns.map((col) => {
              if (col.id === sourceColumn.id) {
                return { ...col, taskIds: sourceTaskIds };
              }
              if (col.id === destColumn.id) {
                return { ...col, taskIds: destTaskIds };
              }
              return col;
            }),
          };
        }
      }

      return {
        ...prevState,
        tasks: {
          ...prevState.tasks,
          [taskId]: { ...task, ...updates },
        },
      };
    });
  }, []);

  const deleteTask = useCallback((taskId: string, columnId: string) => {
    setState((prevState) => {
      const { [taskId]: deletedTask, ...remainingTasks } = prevState.tasks;

      return {
        ...prevState,
        tasks: remainingTasks,
        columns: prevState.columns.map((col) =>
          col.id === columnId
            ? { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) }
            : col
        ),
      };
    });
  }, []);

  const moveTask = useCallback(
    (
      taskId: string,
      sourceColumnId: string,
      destinationColumnId: string,
      sourceIndex: number,
      destinationIndex: number
    ) => {
      setState((prevState) => {
        const sourceColumn = prevState.columns.find(
          (col) => col.id === sourceColumnId
        );
        const destColumn = prevState.columns.find(
          (col) => col.id === destinationColumnId
        );

        if (!sourceColumn || !destColumn) return prevState;

        if (sourceColumnId === destinationColumnId) {
          // Reordering within the same column
          const newTaskIds = reorderTasksInColumn(
            sourceColumn.taskIds,
            sourceIndex,
            destinationIndex
          );

          return {
            ...prevState,
            columns: prevState.columns.map((col) =>
              col.id === sourceColumnId ? { ...col, taskIds: newTaskIds } : col
            ),
          };
        } else {
          // Moving between columns
          const { source, destination } = moveTaskBetweenColumns(
            sourceColumn.taskIds,
            destColumn.taskIds,
            sourceIndex,
            destinationIndex
          );

          return {
            ...prevState,
            tasks: {
              ...prevState.tasks,
              [taskId]: { ...prevState.tasks[taskId], status: destinationColumnId },
            },
            columns: prevState.columns.map((col) => {
              if (col.id === sourceColumnId) {
                return { ...col, taskIds: source };
              }
              if (col.id === destinationColumnId) {
                return { ...col, taskIds: destination };
              }
              return col;
            }),
          };
        }
      });
    },
    []
  );

  const reorderTask = useCallback(
    (columnId: string, startIndex: number, endIndex: number) => {
      setState((prevState) => {
        const column = prevState.columns.find((col) => col.id === columnId);
        if (!column) return prevState;

        const newTaskIds = reorderTasksInColumn(
          column.taskIds,
          startIndex,
          endIndex
        );

        return {
          ...prevState,
          columns: prevState.columns.map((col) =>
            col.id === columnId ? { ...col, taskIds: newTaskIds } : col
          ),
        };
      });
    },
    []
  );

  return {
    columns: state.columns,
    tasks: state.tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTask,
  };
};
